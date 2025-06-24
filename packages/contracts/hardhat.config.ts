import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-ethers";

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.28",
		settings: {
			viaIR: true,
		},
	},

	networks: {
		eduMainet: {
			chainId: 41923,
			url: "https://open-campus-codex-sepolia.drpc.org",
			accounts: [process.env.PRIVATE_KEY!],
		},
		eduTestnet: {
			chainId: 656476,
			url: "https://rpc.open-campus-codex.gelato.digital",
			accounts: [process.env.PRIVATE_KEY!],
			gasMultiplier: 100,
		},
	},
	etherscan: {
		apiKey: {
			eduTestnet: "------", // just for placeholder, but must be provided
			eduMainet: "------", // just for placeholder, but must be provided
		},
		customChains: [
			{
				network: "eduTestnet",
				chainId: 656476,
				urls: {
					apiURL: "https://edu-chain-testnet.blockscout.com/api",
					browserURL: "https://edu-chain-testnet.blockscout.com/",
				},
			},
			{
				network: "eduMainet",
				chainId: 41923,
				urls: {
					apiURL: "https://educhain.blockscout.com/api",
					browserURL: "https://educhain.blockscout.com/",
				},
			},
		],
	},
	sourcify: {
		enabled: false,
	},
};

export default config;
