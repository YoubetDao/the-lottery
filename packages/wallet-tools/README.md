# Wallet Tools

Ethereum wallet generation utility for The Lottery project.

## Features

- Generate new random Ethereum wallets
- Create wallets from existing private keys
- Extract public keys and addresses
- Validate private keys and addresses

## Installation

```bash
cd packages/wallet-tools
npm install
```

## Usage

```typescript
import { WalletGenerator } from '@the-lottery/wallet-tools';

// Generate a new random wallet
const wallet = WalletGenerator.generateWallet();
console.log(wallet.privateKey);
console.log(wallet.publicKey);
console.log(wallet.address);

// Create wallet from private key
const existingWallet = WalletGenerator.fromPrivateKey('0x...');

// Validation
WalletGenerator.validatePrivateKey('0x...');
WalletGenerator.validateAddress('0x...');
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```