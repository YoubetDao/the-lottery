export const CustomConfig = {
	hardhat: {
		pointsContract: "0x7cC7646D0896e5d50c6A62ad3d29a51989E9d1f7",
		lotteryContract: "",
	},
	eduTestnet: {
		pointsContract: "0x7cC7646D0896e5d50c6A62ad3d29a51989E9d1f7",
		lotteryContract: "0xD22E1B5b0D3B8b817178A21C05eC9d2389ADcE75",
	},
	eduMainet: {
		pointsContract: "0x4429D17e879654fE253dEAdf5EF231e9bCF4C32E",
		lotteryContract: "",
	},
};

export function isValidNetwork(
	network: string
): network is keyof typeof CustomConfig {
	return network in CustomConfig;
}
