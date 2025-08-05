import { ethers } from "ethers";

export interface WalletInfo {
  privateKey: string;
  publicKey: string;
  address: string;
}

export class WalletGenerator {
  static generateWallet(): WalletInfo {
    const wallet = ethers.Wallet.createRandom();

    return {
      privateKey: wallet.privateKey,
      publicKey: wallet.signingKey.publicKey,
      address: wallet.address,
    };
  }

  static fromPrivateKey(privateKey: string): WalletInfo {
    const wallet = new ethers.Wallet(privateKey);

    return {
      privateKey: wallet.privateKey,
      publicKey: wallet.signingKey.publicKey,
      address: wallet.address,
    };
  }

  static validatePrivateKey(privateKey: string): boolean {
    try {
      new ethers.Wallet(privateKey);
      return true;
    } catch {
      return false;
    }
  }

  static validateAddress(address: string): boolean {
    return ethers.isAddress(address);
  }
}

export default WalletGenerator;
