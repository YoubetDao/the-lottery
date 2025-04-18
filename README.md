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

> Note: You might see some source map warnings during development. These are harmless and won't affect the application's functionality.

---

If you’d like to contribute or have any questions, feel free to open an issue or reach out to the project maintainer.