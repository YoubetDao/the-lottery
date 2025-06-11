// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// @dev Interface for Yuzu Points contract
interface IPoints {
    function nonces(bytes32 hashHolderSpender) external view returns (uint256);

    function consume(
        address holder,
        uint256 amount,
        bytes32 consumeReasonCode,
        uint256 deadline,
        bytes calldata signature
    ) external;

    function deposit(
        address holder,
        uint256 amount,
        bytes32 depositReasonCode
    ) external;

    function balances(address user) external view returns (uint256);
}
