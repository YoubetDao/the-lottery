// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Lottery.sol";

contract MockPoints is IPoints {
    event ConsumeCalled(address holder, uint256 amount);

    mapping(address => uint256) private balances;

    function consume(
        address holder,
        uint256 amount,
        bytes32,
        uint256,
        bytes calldata
    ) external override {
        require(balances[holder] >= amount, "Insufficient points");
        balances[holder] -= amount;
        emit ConsumeCalled(holder, amount);
    }

    function mint(address to, uint256 amount) external {
        balances[to] += amount;
    }

    function balanceOf(address user) external view returns (uint256) {
        return balances[user];
    }
}