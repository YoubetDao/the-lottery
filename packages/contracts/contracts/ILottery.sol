// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @dev Interface for lottery contract
abstract contract ILottery {
    // @dev Create a new round of the lottery
    function createRound(
        uint256 startTime,
        uint256 endTime,
        uint256 rewardAmount,
        uint256 winerCount
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
}
