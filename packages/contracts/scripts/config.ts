export const CustomConfig = {
	hardhat: {
		pointsContract: "0x4429D17e879654fE253dEAdf5EF231e9bCF4C32E",
	},
	eduTestnet: {
		pointsContract: "0x4429D17e879654fE253dEAdf5EF231e9bCF4C32E",
	},
	eduMainet: {
		pointsContract: "0x4429D17e879654fE253dEAdf5EF231e9bCF4C32E",
	},
};

export function isValidNetwork(
	network: string
): network is keyof typeof CustomConfig {
	return network in CustomConfig;
}
