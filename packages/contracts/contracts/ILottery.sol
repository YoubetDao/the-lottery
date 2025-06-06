// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LotteryDataLayout.sol";

// @dev Interface for lottery contract
abstract contract ILottery {
    // @dev Create a new round of the lottery
    function createRound(
        uint256 startTime,
        uint256 endTime,
        uint256[] memory prizeTiers
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

    // @dev Get the round info
    function getRound(
        uint256 roundId
    ) external view virtual returns (LotteryDataLayout.RoundHistory memory);

    // @dev Get the lottery history for a specific address
    function getUserHistory(
        address walletAddress,
        uint256 page,
        uint256 pageSize
    )
        external
        view
        virtual
        returns (LotteryDataLayout.UserHistory[] memory, bool hasMore);

    // @dev Get the lottery history for a specific address and round
    function getUserRoundHistory(
        address walletAddress,
        uint256 roundId
    ) external view virtual returns (LotteryDataLayout.UserHistory memory);

    // @dev Get the last round of the lottery
    function getLastRoundId() external view virtual returns (int256);

    // @dev Get the last drawn round ID
    function getLastDrawnRoundId() external view virtual returns (int256);

    // @dev Generate parameters for signature verification
    function generateSigParam(
        address holder,
        uint256 roundId
    ) public view virtual returns (bytes32 consumeReasonCode, uint256 nonce);
}
