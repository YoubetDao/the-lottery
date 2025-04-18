# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

# Lottery Contract Test Report

The following summarizes the test results using Hardhat + Chai:

```bash
$ npx hardhat test

  Lottery
    constructor
      ✓ should revert if points address is zero
    createRound
      ✓ should allow owner to create round
      ✓ should revert if non-owner tries to create round
      ✓ should revert if startTime >= endTime
      ✓ should revert if reward is 0
      ✓ should revert if winner count is 0
    buy
      ✓ should allow user to buy and call consume()
      ✓ should revert if roundId is invalid
      ✓ should revert if amount is 0
      ✓ should revert if round has not started
      ✓ should revert if round has ended
      ✓ should revert if deadline has passed
      ✓ should revert if round is closed
      ✓ should revert if ticketsToIssue is 0
    draw
      ✓ should correctly draw winners
      ✓ should revert if non-owner tries to draw
      ✓ should revert if roundId is out of range
      ✓ should revert if round has not ended
      ✓ should revert if round is closed
      ✓ should revert if no participants
      ✓ should revert if winner count is 0

  20 passing (2s)

Test Environment: Hardhat + Ethers v6 + Chai + Mocha
```

## 📊 Solidity Coverage Report

| File                         | Statements | Branches | Functions | Lines  | Uncovered Lines |
|------------------------------|------------|----------|-----------|--------|------------------|
| contracts/ILottery.sol       | 100%       | 100%     | 100%      | 100%   | -                |
| contracts/Lottery.sol        | 100%       | 92.11%   | 100%      | 100%   | -                |
| contracts/LotteryDataLayout.sol | 100%   | 100%     | 100%      | 100%   | -                |
| contracts/MockPoints.sol     | 100%       | 100%     | 100%      | 100%   | -                |
| **Total**                    | **100%**   | **92.11%** | **100%** | **100%** |                  |