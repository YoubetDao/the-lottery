// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @dev Abstract contract for lottery data layout
abstract contract LotteryDataLayout {
    // @dev Represents a single round of the lottery
    struct Round {
        // Whether the draw is open
        bool isOpen;
        // Start time
        uint256 startTime;
        // End time
        uint256 endTime;
        // Reward amount
        uint256 rewardAmount;
        // Number of winners
        uint256 winnerCount;
        // Prize tiers
        uint256[] prizeTiers;
        // Participating users, each user has one slot, used for the draw
        address[] users;
        // Amount of yuzu spent by each user
        mapping(address => uint256) usersMap;
        // Number of tickets owned by each user
        mapping(address => uint256) ticketsCount;
        // Mapping of ticket IDs to user addresses
        mapping(uint256 => address) ticketOwners;
        // Total number of tickets issued for this round
        uint256 totalTickets;
        // Total amount of yuzu spent by users
        uint256 accumulatedAmount;
        // Total number of participants
        uint256 accumulatedParticipants;
        // Winning numbers
        uint256[] winNumbers;
        // Winning users
        address[] winnerUsers;
    }

    // @dev Represents a single round of the lottery, used for query
    struct RoundHistory {
        // Whether the draw is open
        bool isOpen;
        // Start time
        uint256 startTime;
        // End time
        uint256 endTime;
        // Reward amount
        uint256 rewardAmount;
        // Number of winners
        uint256 winnerCount;
        // Prize tiers
        uint256[] prizeTiers;
        // Total number of tickets issued for this round
        uint256 totalTickets;
        // Total amount of yuzu spent by users
        uint256 accumulatedAmount;
        // Total number of participants
        uint256 accumulatedParticipants;
        // Winning numbers
        uint256[] winNumbers;
        // Winning users
        address[] winnerUsers;
    }

    // @dev Represents the history of a user's participation in a round
    struct UserHistory {
        // The round ID
        uint256 roundId;
        // Round start time
        uint256 startTime;
        // Round end time
        uint256 endTime;
        // The amount of yuzu spent
        uint256 totalAmountSpent;
        // The number of tickets owned
        uint256 totalTicketCount;
        // win ticket count, may be zero if not drawn or not winner
        uint256 winningTicketCount;
    }

    // @dev Emitted when a new round is created
    event RoundCreated(
        // @dev The id of the round
        uint256 indexed roundId,
        // @dev The start time of the round
        uint256 startTime,
        // @dev The end time of the round
        uint256 endTime,
        // @dev The reward amount of the round
        uint256 rewardAmount,
        // @dev The number of winners of the round
        uint256 winerCount,
        // @dev The prize tiers of the round
        uint256[] prizeTiers
    );

    // @dev Emitted when a user buys lottery tickets
    event LotteryTicketBought(
        // @dev The id of the round
        uint256 indexed roundId,
        // @dev The address of the user who buys the lottery tickets
        address indexed user,
        // @dev The amount of yuzu spent by the user
        uint256 amount
    );

    // @dev Emitted when the draw is closed and the winning numbers are drawn
    event DrawClosed(
        // @dev The id of the round
        uint256 indexed roundId,
        // @dev The winning numbers
        uint256[] winNumbers,
        // @dev The addresses of the winners
        address[] winUsers
    );

    // @dev Emitted when the winners are selected
    event WinnersSelected(
        // @dev The id of the round
        uint256 indexed roundId,
        // @dev The addresses of the winners
        address[] winnerUsers
    );

    // @dev The array of rounds, support parallel rounds
    Round[] public rounds;

    // @dev The mapping of user addresses to their history
    mapping(address => uint256[]) public userHistories;

    bytes32 public constant CONSUME_TYPEHASH =
        keccak256(
            "Consume(address holder,address spender,uint256 amount,bytes32 reasonCode,uint256 deadline,uint256 nonce)"
        );

    string public constant PREFIX_REASON_CODE = "yuzu-lottery-";
}
