import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const config: HardhatUserConfig = {
	solidity: "0.8.28",

	networks: {
		// eduMainet: {
		// 	chainId: 41923,
		// 	url: "https://rpc.edu-chain.raas.gelato.cloud",
		// 	accounts: [process.env.PRIVATE_KEY!],
		// },
		// eduTestnet: {
		// 	chainId: 656476,
		// 	url: "https://rpc.open-campus-codex.gelato.digital",
		// 	accounts: [process.env.PRIVATE_KEY!],
		// 	gasMultiplier: 100,
		// 	forking: {
		// 		enabled: true,
		// 		url: "https://rpc.edu-chain.raas.gelato.cloud",
		// 	},
		// },
	},
};

export default config;
