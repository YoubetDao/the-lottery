# YUZU Lottery Project

## 🌍 README Translations

[中文说明](./README_ZH.md)

## Introduction

This is the **YUZU Lottery** project, designed to enable a transparent and fair lottery system through on-chain smart contracts.

The PRD and design mockups can be found in the [material](./material/) folder. There are **monetary rewards** available! Developers are welcome to claim tasks and contribute via the [According Work project page](https://according.work/projects/67e166c587803b11c423a469/).

## Tech Stack

### Smart Contracts

The smart contract part of this project is built using [Hardhat](https://hardhat.org/) with [Solidity](https://docs.soliditylang.org/) as the programming language.

- Framework: Hardhat
- Language: Solidity
- Features: Lottery logic, participant tracking, draw process, etc.
- Testing: Supports local unit testing and testnet deployment

### Frontend

The frontend is built with React and uses modern web3 libraries for blockchain interaction.

#### Tech Stack

- Framework: React with TypeScript
- Package Manager: pnpm
- Web3 Libraries: wagmi, viem
- UI: TailwindCSS

#### Getting Started

1. Install dependencies (from project root):

```bash
pnpm install
```

2. Start the development server:

```bash
cd packages/front-end
pnpm start
```

The app will be available at `http://localhost:3000`.

## Contract Scripts

The project includes several scripts for contract deployment and management. All scripts should be run from the `packages/contracts` directory.

### Prerequisites

Before running any scripts, make sure to:

1. Set up environment variables:

```bash
# Create .env file in packages/contracts/
PRIVATE_KEY=your_private_key_here
```

2. Install dependencies:

```bash
cd packages/contracts
pnpm install
```

### Available Scripts

**1. Deploy Lottery Contract**

```bash
# Deploy to mainnet
pnpm hardhat run scripts/deployLottery.ts --network eduMainet

# Deploy to testnet
pnpm hardhat run scripts/deployLottery.ts --network eduTestnet
```

This script deploys the Lottery contract and automatically verifies it on the blockchain explorer.

**Important**: After deployment, remember to update the contract address in `scripts/config.ts` with the newly deployed contract address.

**2. Create New Lottery Round**

```bash
# Create round on mainnet
pnpm hardhat run scripts/createRound.ts --network eduMainet

# Create round on testnet
pnpm hardhat run scripts/createRound.ts --network eduTestnet
```

This script creates a new lottery round with predefined prize tiers, like:

- 1st prize: 0.03 ETH
- 2nd prize: 0.02 ETH
- 3rd prize: 0.01 ETH

**3. Purchase Lottery Tickets**

```bash
# Buy tickets on mainnet
pnpm hardhat run scripts/buy.ts --network eduMainet

# Buy tickets on testnet
pnpm hardhat run scripts/buy.ts --network eduTestnet
```

This script allows users to purchase lottery tickets using Points tokens (100 points per ticket).

**4. Draw Lottery Winners**

```bash
# Draw winners on mainnet
pnpm hardhat run scripts/drawRound.ts --network eduMainet

# Draw winners on testnet
pnpm hardhat run scripts/drawRound.ts --network eduTestnet
```

This script executes the lottery draw for the current round. Only the contract owner can perform this action.

**5. Verify Deployed Contract**

```bash
# Verify contract on mainnet
pnpm hardhat run scripts/verify.ts --network eduMainet

# Verify contract on testnet
pnpm hardhat run scripts/verify.ts --network eduTestnet
```

This script verifies the deployed contract on the blockchain explorer.

### Network Configuration

- **eduMainet**: Open Campus Codex Mainnet (Chain ID: 41923)
- **eduTestnet**: Open Campus Codex Testnet (Chain ID: 656476)

Contract addresses are configured in `scripts/config.ts` and must be updated after deployment.

---

If you’d like to contribute or have any questions, feel free to open an issue or reach out to the project maintainer.

> Note: You might see some source map warnings during development. These are harmless and won't affect the application's functionality.
