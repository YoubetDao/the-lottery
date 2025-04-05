// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LotteryDataLayout.sol";
import "./ILottery.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// YuzuPoints interface
interface IPoints {
    function consume(
        address holder,
        uint256 amount,
        bytes32 consumeReasonCode,
        uint256 deadline,
        bytes calldata signature
    ) external;
}

contract Lottery is LotteryDataLayout, ILottery, Ownable {
    // YuzuPoints contract address
    IPoints public points;

    constructor(address initialOwner, address _points) Ownable(initialOwner) {
        require(_points != address(0), "Invalid points contract address");
        points = IPoints(_points);
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
        bytes32 signature,
        uint256 deadline
    ) external override {
        require(roundId > 0 && roundId <= rounds.length, "Invalid round ID");
        require(amount > 0, "Amount must be greater than 0");

        Round storage round = rounds[roundId - 1];
        require(round.isOpen, "Round is not open");
        require(block.timestamp >= round.startTime, "Round has not started");
        require(block.timestamp <= round.endTime, "Round has ended");

        uint256 ticketsToIssue = amount;
        require(ticketsToIssue > 0, "Tickets to issue must be greater than 0");

        // consume yuzu
        // use the predefined consume reason code
        
        // validate that deadline is in the future
        require(deadline > block.timestamp, "Deadline must be in the future");

        // call Points contract consume function, use signature for authorization
        points.consume(
            msg.sender,
            amount,
            LOTTERY_TICKET_PURCHASE,
            deadline,
            signature
        );

        // If the user has not participated in this round, add them to the round
        if (round.usersMap[msg.sender] == 0) {
            round.users.push(msg.sender);
            round.accumulatedParticipants++;
        }

        // Update user's spent amount
        round.usersMap[msg.sender] += amount;
        round.accumulatedAmount += amount;

        // Issue tickets
        uint256 startTicketId = round.totalTickets;
        uint256 endTicketId = startTicketId + ticketsToIssue - 1;

        // Assign tickets to user
        for (uint256 i = startTicketId; i <= endTicketId; i++) {
            round.ticketOwners[i] = msg.sender;
        }

        // Update ticket counts
        round.ticketsCount[msg.sender] += ticketsToIssue;
        round.totalTickets += ticketsToIssue;

        // Emit events
        emit LotteryTicketBought(roundId, msg.sender, amount);
    }

    function draw(uint256 roundId) external override onlyOwner {
        // TODO: Implement the draw logic
    }
}
