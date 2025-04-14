export const ILotteryABI = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "roundId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes",
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256",
			},
		],
		name: "buy",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "startTime",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "endTime",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "rewardAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "winerCount",
				type: "uint256",
			},
		],
		name: "createRound",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "roundId",
				type: "uint256",
			},
		],
		name: "draw",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
] as const;
