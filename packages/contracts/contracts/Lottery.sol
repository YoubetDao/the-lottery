// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LotteryDataLayout.sol";
import "./ILottery.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {SignatureChecker} from "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "./IPoints.sol";

contract Lottery is LotteryDataLayout, ILottery, Ownable {
    using Strings for uint256;

    // YuzuPoints contract address
    IPoints public points;

    constructor(address initialOwner, address _points) Ownable(initialOwner) {
        require(_points != address(0), "Invalid points contract address");
        points = IPoints(_points);
    }

    function getUserHistory(
        address walletAddress,
        uint256 page,
        uint256 pageSize
    )
        external
        view
        override
        returns (UserHistory[] memory historyList, bool hasMore)
    {
        require(page > 0, "Page must be greater than 0");
        require(pageSize > 0, "Page size must be greater than 0");

        uint256 startIndex = (page - 1) * pageSize;
        uint256 endIndex = Math.min(
            userHistories[walletAddress].length,
            startIndex + pageSize
        );

        uint256 resultCount = endIndex - startIndex;

        UserHistory[] memory result = new UserHistory[](resultCount);

        for (uint256 i = 0; i < resultCount; i++) {
            uint256 roundId = userHistories[walletAddress][startIndex + i];

            Round storage round = rounds[roundId];

            uint256 prizeWon = getPrizeWon(roundId, walletAddress);

            result[i] = UserHistory({
                roundId: roundId,
                startTime: round.startTime,
                endTime: round.endTime,
                totalAmountSpent: round.usersMap[walletAddress],
                totalTicketCount: round.ticketsCount[walletAddress],
                winningTicketCount: getUserWinCount(roundId, walletAddress),
                prizeWon: prizeWon
            });
        }

        historyList = result;
        hasMore = userHistories[walletAddress].length > endIndex;
    }

    function getUserRoundHistory(
        address walletAddress,
        uint256 roundId
    ) external view override returns (UserHistory memory result) {
        require(roundId < rounds.length, "Invalid round ID");

        Round storage round = rounds[roundId];

        uint256 prizeWon = getPrizeWon(roundId, walletAddress);

        result = UserHistory({
            roundId: roundId,
            startTime: round.startTime,
            endTime: round.endTime,
            totalAmountSpent: round.usersMap[walletAddress],
            totalTicketCount: round.ticketsCount[walletAddress],
            winningTicketCount: getUserWinCount(roundId, walletAddress),
            prizeWon: prizeWon
        });
    }

    function getRound(
        uint256 roundId
    )
        external
        view
        override
        returns (LotteryDataLayout.RoundHistory memory result)
    {
        require(roundId < rounds.length, "Invalid round ID");

        Round storage round = rounds[roundId];

        result = RoundHistory({
            isOpen: round.isOpen,
            startTime: round.startTime,
            endTime: round.endTime,
            rewardAmount: round.rewardAmount,
            winnerCount: round.winnerCount,
            prizeTiers: round.prizeTiers,
            totalTickets: round.totalTickets,
            accumulatedAmount: round.accumulatedAmount,
            accumulatedParticipants: round.accumulatedParticipants,
            winNumber: round.winNumber,
            winnerUsers: round.winnerUsers
        });
    }

    function getUserWinCount(
        uint256 roundId,
        address user
    ) public view returns (uint256 winCount) {
        Round storage round = rounds[roundId];

        for (uint256 i = 0; i < round.winnerUsers.length; i++) {
            if (round.winnerUsers[i] == user) {
                winCount++;
            }
        }
        return winCount;
    }

    function createRound(
        uint256 startTime,
        uint256 endTime,
        uint256[] memory prizeTiers
    ) external override onlyOwner {
        require(startTime < endTime, "Start time must be before end time");

        uint256 winnerCount = prizeTiers.length;
        require(winnerCount > 0, "Winer count must be greater than 0");

        uint256 rewardAmount = 0;
        for (uint256 i = 0; i < prizeTiers.length; i++) {
            rewardAmount += prizeTiers[i];
        }

        require(rewardAmount > 0, "Reward amount must be greater than 0");

        Round storage round = rounds.push();

        round.startTime = startTime;
        round.endTime = endTime;
        round.rewardAmount = rewardAmount;
        round.winnerCount = winnerCount;
        round.prizeTiers = prizeTiers;
        round.isOpen = true;

        emit RoundCreated(
            rounds.length,
            startTime,
            endTime,
            rewardAmount,
            winnerCount,
            prizeTiers
        );
    }

    function buy(
        uint256 roundId,
        uint256 amount,
        bytes calldata signature,
        uint256 deadline
    ) external override {
        require(roundId >= 0 && roundId < rounds.length, "Invalid round ID");
        require(amount > 0, "Amount must be greater than 0");

        Round storage round = rounds[roundId];
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
        (bytes32 consumeReasonCode, ) = generateSigParam(msg.sender, roundId);

        points.consume(
            msg.sender,
            amount,
            consumeReasonCode,
            deadline,
            signature
        );

        // If the user has not participated in this round, add them to the round
        if (round.usersMap[msg.sender] == 0) {
            round.users.push(msg.sender);
            round.accumulatedParticipants++;

            // mark user history
            userHistories[msg.sender].push(roundId);
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
        require(round.winnerCount > 0, "No winners specified");

        uint256 participantCount = round.users.length;
        require(participantCount > 0, "No participants");

        // generate a random number
        round.winNumber = uint256(
            keccak256(
                abi.encodePacked(
                    block.prevrandao,
                    block.timestamp,
                    participantCount
                )
            )
        );

        // 选择多个获奖者
        address[] memory winners = new address[](round.winnerCount);
        for (uint256 i = 0; i < round.winnerCount; i++) {
            uint256 randomIndex = uint256(
                keccak256(
                    abi.encodePacked(
                        round.winNumber,
                        round.users[participantCount - 1],
                        i // 添加循环索引增加随机性
                    )
                )
            ) % participantCount;
            winners[i] = round.users[randomIndex];
        }

        round.winnerUsers = winners;
        round.isOpen = false;
        emit WinnersSelected(roundId, round.winNumber, winners);
    }

    function getLastRoundId() external view override returns (int256 result) {
        if (rounds.length == 0) {
            return -1;
        }

        return int256(rounds.length - 1);
    }

    function getLastDrawnRoundId() external view override returns (int256) {
        if (rounds.length == 0) {
            return -1;
        }

        for (uint256 i = rounds.length; i > 0; i--) {
            if (!rounds[i - 1].isOpen) {
                return int256(i - 1);
            }
        }

        return -1;
    }

    function generateSigParam(
        address holder,
        uint256 roundId
    ) public view override returns (bytes32 consumeReasonCode, uint256 nonce) {
        address spender = address(this);
        bytes32 nonceKey = keccak256(abi.encodePacked(holder, spender));

        nonce = points.nonces(nonceKey);

        // roundId is 0-based, but the consume reason code is 1-based
        string memory reasonStr = string(
            abi.encodePacked(PREFIX_REASON_CODE, (roundId + 1).toString())
        );

        consumeReasonCode = leftPadToBytes32(reasonStr);
    }

    function leftPadToBytes32(
        string memory source
    ) internal pure returns (bytes32 result) {
        bytes memory strBytes = bytes(source);
        require(strBytes.length <= 32, "String too long");

        uint256 len = strBytes.length;
        uint256 shift = (32 - len) * 8; // 位移多少位

        assembly {
            let data := mload(add(strBytes, 32)) // 取出字符串内容（最高 32 字节）
            result := shr(shift, data) // 向右移动，把内容靠右，前面补 0
        }
    }

    function getPrizeWon(
        uint256 roundId,
        address user
    ) public view returns (uint256 prizeWon) {
        Round storage round = rounds[roundId];

        for (uint256 i = 0; i < round.winnerUsers.length; i++) {
            if (round.winnerUsers[i] == user) {
                prizeWon += round.prizeTiers[i];
            }
        }
    }
}
