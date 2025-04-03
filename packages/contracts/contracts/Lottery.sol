// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LotteryDataLayout.sol";
import "./ILottery.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is LotteryDataLayout, ILottery, Ownable {
    constructor() Ownable(msg.sender) {}

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

    /**
     * @dev Executes the lottery draw to select winners
     * @notice Only callable by contract owner. Uses on-chain data for pseudo-randomness (less secure than Chainlink VRF)
     * @param roundId The round ID to draw
     */
    function draw(uint256 roundId) external override onlyOwner {
        require(roundId < rounds.length, "Invalid round ID");
        Round storage round = rounds[roundId];
        require(block.timestamp >= round.endTime, "Round not ended");
        require(round.isOpen, "Round already closed");
        require(round.winerCount > 0, "No winners specified");

        uint256 participantCount = round.users.length;
        require(participantCount > 0, "No participants");
        
        // 选择多个获奖者
        address[] memory winners = new address[](round.winerCount);
        for (uint256 i = 0; i < round.winerCount; i++) {
            uint256 randomIndex = uint256(
                keccak256(
                    abi.encodePacked(
                        block.prevrandao,
                        block.timestamp,
                        participantCount,
                        round.users[participantCount - 1],
                        i // 添加循环索引增加随机性
                    )
                )
            ) % participantCount;
            winners[i] = round.users[randomIndex];
        }

        round.winnerUsers = winners;
        round.isOpen = false;
        emit WinnersSelected(roundId, winners);
    }
}
