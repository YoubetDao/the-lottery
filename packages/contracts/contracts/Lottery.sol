// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LotteryDataLayout.sol";
import "./ILottery.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is LotteryDataLayout, ILottery, Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

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
        // TODO: Implement the draw logic
    }
}
