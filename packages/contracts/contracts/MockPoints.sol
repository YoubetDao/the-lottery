// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Lottery.sol";

contract MockPoints is IPoints {
    event ConsumeCalled(address holder, uint256 amount);

    function consume(
        address holder,
        uint256 amount,
        bytes32,
        uint256,
        bytes calldata
    ) external override {
        emit ConsumeCalled(holder, amount);
    }
}