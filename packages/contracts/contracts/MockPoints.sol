// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {SignatureChecker} from "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

import "./IPoints.sol";

contract MockPoints is EIP712, IPoints {
    event ConsumeCalled(address holder, uint256 amount);

    error InvalidSignature();
    error ExpiredSignature();

    bytes32 private constant CONSUME_TYPEHASH =
        keccak256(
            "Consume(address holder,address spender,uint256 amount,bytes32 reasonCode,uint256 deadline,uint256 nonce)"
        );

    mapping(address => uint256) public balances;

    mapping(bytes32 hashHolderSpender => uint256 nonce) public nonces;

    constructor() EIP712("Points", "1.0") {}

    function consume(
        address holder,
        uint256 amount,
        bytes32 consumeReasonCode,
        uint256 deadline,
        bytes calldata signature
    ) external override {
        if (block.timestamp > deadline) {
            revert ExpiredSignature();
        }
        address spender = msg.sender;
        bytes32 nonceKey = keccak256(abi.encodePacked(holder, spender));
        uint256 nonce = nonces[nonceKey];

        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    CONSUME_TYPEHASH,
                    holder,
                    spender,
                    amount,
                    consumeReasonCode,
                    deadline,
                    nonce
                )
            )
        );
        bool isValid = SignatureChecker.isValidSignatureNow(
            holder,
            digest,
            signature
        );
        if (!isValid) {
            revert InvalidSignature();
        }

        // @dev Mock the consume function
        balances[holder] -= amount;

        nonces[nonceKey] = nonce + 1;

        emit ConsumeCalled(holder, amount);
    }

    function mint(address to, uint256 amount) external {
        balances[to] += amount;
    }

    function balanceOf(address user) external view returns (uint256) {
        return balances[user];
    }

    function deposit(
        address holder,
        uint256 amount,
        bytes32 depositReasonCode
    ) external override {}
}
