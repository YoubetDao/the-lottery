// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LotteryDataLayout.sol";
import "./ILottery.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {VRFConsumerBaseV2} from "./VRFConsumerBaseV2.sol";
import {VRFCoordinatorV2Interface} from "./VRFCoordinatorV2Interface.sol";


contract Lottery is LotteryDataLayout, ILottery, VRFConsumerBaseV2, Ownable {
    // Chainlink VRF variables
    VRFCoordinatorV2Interface private immutable vrfCoordinator;
    uint64 private immutable subscriptionId;
    bytes32 private immutable keyHash;
    uint32 private immutable callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    // Mapping from requestId to roundId
    mapping(uint256 => uint256) public vrfRequests;

    constructor(
        address _vrfCoordinator,
        uint64 _subscriptionId,
        bytes32 _keyHash,
        uint32 _callbackGasLimit
    ) VRFConsumerBaseV2(_vrfCoordinator) Ownable(msg.sender) {
        vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
        subscriptionId = _subscriptionId;
        keyHash = _keyHash;
        callbackGasLimit = _callbackGasLimit;
    }

    function createRound(
        uint256 startTime,
        uint256 endTime,
        uint256 rewardAmount,
        uint256 winerCount
    ) external virtual override onlyOwner {
        require(startTime < endTime, "Start time must be before end time");
        require(rewardAmount > 0, "Reward amount must be greater than 0");
        require(winerCount > 0, "Winer count must be greater than 0");

        Round storage round = rounds.push();

        round.startTime = startTime;
        round.endTime = endTime;
        round.rewardAmount = rewardAmount;
        round.winerCount = winerCount;
        round.isOpen = true;

        emit RoundCreated(
            rounds.length,
            startTime,
            endTime,
            rewardAmount,
            winerCount
        );
    }

    function buy(
        uint256 roundId,
        uint256 amount,
        bytes32 signature
    ) external override {
        // TODO: Implement the buy logic
    }

    function draw(uint256 roundId) external override onlyOwner {
        require(roundId < rounds.length, "Invalid round ID");
        Round storage round = rounds[roundId];
        require(block.timestamp >= round.endTime, "Round not ended");
        require(round.isOpen, "Round already closed");

        // Request random number from Chainlink VRF
        uint256 requestId = vrfCoordinator.requestRandomWords(
            keyHash,
            subscriptionId,
            REQUEST_CONFIRMATIONS,
            callbackGasLimit,
            NUM_WORDS
        );
        
        vrfRequests[requestId] = roundId;
        emit DrawStarted(roundId, requestId);
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        uint256 roundId = vrfRequests[requestId];
        Round storage round = rounds[roundId];
        
        // Use random number to select winners
        uint256 randomNumber = randomWords[0];
        // TODO: Implement winner selection logic
        
        round.isOpen = false;
        emit DrawCompleted(roundId, randomNumber);
    }
}
