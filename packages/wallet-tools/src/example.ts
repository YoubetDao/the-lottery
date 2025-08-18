import { WalletGenerator } from './index';

console.log('=== Ethereum Wallet Generator ===\n');

console.log('1. Generating a new random wallet:');
const newWallet = WalletGenerator.generateWallet();
console.log('Private Key:', newWallet.privateKey);
console.log('Public Key:', newWallet.publicKey);
console.log('Address:', newWallet.address);

console.log('\n2. Creating wallet from existing private key:');
const existingWallet = WalletGenerator.fromPrivateKey(newWallet.privateKey);
console.log('Address (should match):', existingWallet.address);

console.log('\n3. Validation tests:');
console.log('Private key valid:', WalletGenerator.validatePrivateKey(newWallet.privateKey));
console.log('Address valid:', WalletGenerator.validateAddress(newWallet.address));
console.log('Invalid private key test:', WalletGenerator.validatePrivateKey('invalid'));
console.log('Invalid address test:', WalletGenerator.validateAddress('invalid'));