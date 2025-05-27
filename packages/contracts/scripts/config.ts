export const CustomConfig = {
	eduTestnet: {
		pointsContract: "0x7cC7646D0896e5d50c6A62ad3d29a51989E9d1f7",
		lotteryContract: "0x3D14210B1DB885614B0162867592AD29f3420BAD",
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
