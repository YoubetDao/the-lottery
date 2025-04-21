export const CustomConfig = {
	hardhat: {
		pointsContract: "0x7cC7646D0896e5d50c6A62ad3d29a51989E9d1f7",
		lotteryContract: "",
	},
	eduTestnet: {
		pointsContract: "0x7cC7646D0896e5d50c6A62ad3d29a51989E9d1f7",
		lotteryContract: "0x255E1AE6a1e8165232808Bc3275A3D5106C64306",
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
