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
      ✓ should revert if winner count is 0
    buy
      ✓ should allow user to buy and call consume()
      ✓ should revert if roundId is invalid
      ✓ should revert if amount is 0
      ✓ should revert if round has not started
      ✓ should revert if round has ended
      ✓ should revert if deadline has passed
      ✓ should revert if round is closed
    draw
      ✓ should correctly draw winners
      ✓ should revert if non-owner tries to draw
      ✓ should revert if roundId is out of range
      ✓ should revert if round has not ended
      ✓ should revert if round is closed
      ✓ should revert if no participants
    views and utils
      ✓ should return correct user history and round info
      ✓ should return correct last round id and last drawn round id
      ✓ should return 0 prize for user if not a winner
      ✓ should return 0 win count for user if not a winner
      ✓ should revert getUserHistory if page or pageSize is 0
      ✓ should revert getUserRoundHistory and getRound if roundId is invalid

  26 passing (538ms)

Test Environment: Hardhat + Ethers v6 + Chai + Mocha
```

## 📊 Solidity Coverage Report

| File                         | Statements | Branches | Functions | Lines  | Uncovered Lines |
|------------------------------|------------|----------|-----------|--------|------------------|
| contracts/ILottery.sol       | 100%       | 100%     | 100%      | 100%   | -                |
| contracts/IPoints.sol        | 100%       | 100%     | 100%      | 100%   | -                |
| contracts/Lottery.sol        | 75%        | 75.86%   | 100%      | 68.27% | 291, 337, 338     |
| contracts/LotteryDataLayout.sol | 100%    | 100%     | 100%      | 100%   | -                |
| contracts/MockPoints.sol     | 88.89%     | 50%      | 80%       | 71.43% | 34, 63, 65, 67    |
| **Total**                    | **76.47%** | **74.19%** | **94.44%** | **68.64%** |              |