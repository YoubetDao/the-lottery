export const CustomConfig = {
	eduTestnet: {
		pointsContract: "0x7cC7646D0896e5d50c6A62ad3d29a51989E9d1f7",
		lotteryContract: "0x2AB4644281eEDE3CD8Ec1fCA009D75ae59eDA33c",
	},
	eduMainet: {
		pointsContract: "0x4429D17e879654fE253dEAdf5EF231e9bCF4C32E",
		lotteryContract: "0x7ad8047DA17476fAE85492Fd174f2cc079E997dB",
	},
};

export function isValidNetwork(
	network: string
): network is keyof typeof CustomConfig {
	return network in CustomConfig;
}
