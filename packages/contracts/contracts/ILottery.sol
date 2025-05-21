// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LotteryDataLayout.sol";

// @dev Interface for lottery contract
abstract contract ILottery {
    // @dev Create a new round of the lottery
    function createRound(
        uint256 startTime,
        uint256 endTime,
        uint256 rewardAmount,
        uint256 winnerCount
    ) external virtual;

    // @dev User buys lottery tickets
    function buy(
        uint256 roundId,
        uint256 amount,
        bytes calldata signature,
        uint256 deadline
    ) external virtual;

    // @dev Draw the winning numbers
    function draw(uint256 roundId) external virtual;

    // @dev Get the lottery history for a specific address
    function getUserHistory(
        address walletAddress,
        uint256 page,
        uint256 pageSize
    ) external view virtual returns (LotteryDataLayout.UserHistory[] memory);

    // @dev Get the last round of the lottery
    function getLastRoundId() external view virtual returns (uint256);

    // @dev Generate a digest for signature verification
    function generateDigest(
        address user,
        uint256 amount,
        uint256 reason,
        uint256 deadline
    ) external view virtual returns (bytes32);
}
