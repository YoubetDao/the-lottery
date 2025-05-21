// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Lottery.sol";

contract MockPoints is IPoints {
    event ConsumeCalled(address holder, uint256 amount);

    mapping(address => uint256) mockBalance;

    function consume(
        address holder,
        uint256 amount,
        bytes32,
        uint256,
        bytes calldata
    ) external override {
        require(mockBalance[holder] >= amount, "Insufficient points");
        mockBalance[holder] -= amount;
        emit ConsumeCalled(holder, amount);
    }

    function mint(address to, uint256 amount) external {
        mockBalance[to] += amount;
    }

    function balanceOf(address user) external view returns (uint256) {
        return mockBalance[user];
    }

    function nonces(
        bytes32 hashHolderSpender
    ) external view override returns (uint256) {
        return 0;
    }

    function deposit(
        address holder,
        uint256 amount,
        bytes32 depositReasonCode
    ) external override {}

    function balances(address user) external view override returns (uint256) {
        return mockBalance[user];
    }
}
