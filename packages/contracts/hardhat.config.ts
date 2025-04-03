import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
import { resolve } from "path";
import "@chainlink/hardhat-chainlink";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-network-helpers";

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

// Chainlink VRF config
const VRF_CONFIG = {
  eduTestnet: {
    vrfCoordinator: "0x6A2AAd07396B36Fe02a22b33cf443582f682c82f",
    keyHash: "0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314",
    subscriptionId: 1, // Replace with your subscription ID
    callbackGasLimit: 100000,
  }
};

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: "https://rpc.open-campus-codex.gelato.digital",
      },
    },
    eduMainet: {
      chainId: 41923,
      url: "https://rpc.edu-chain.raas.gelato.cloud",
      accounts: [process.env.PRIVATE_KEY!],
    },
    eduTestnet: {
      chainId: 656476,
      url: "https://rpc.open-campus-codex.gelato.digital",
      accounts: [process.env.PRIVATE_KEY!],
      gasMultiplier: 1.9,
    },
  },
};

export default config;
