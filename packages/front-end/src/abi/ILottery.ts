export const ILotteryABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "initialOwner",
				type: "address",
			},
			{
				internalType: "address",
				name: "_points",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		name: "OwnableInvalidOwner",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "OwnableUnauthorizedAccount",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "roundId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256[]",
				name: "winNumbers",
				type: "uint256[]",
			},
			{
				indexed: false,
				internalType: "address[]",
				name: "winUsers",
				type: "address[]",
			},
		],
		name: "DrawClosed",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "roundId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "LotteryTicketBought",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "roundId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "startTime",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "endTime",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "rewardAmount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "winerCount",
				type: "uint256",
			},
		],
		name: "RoundCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "roundId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address[]",
				name: "winnerUsers",
				type: "address[]",
			},
		],
		name: "WinnersSelected",
		type: "event",
	},
	{
		inputs: [],
		name: "CONSUME_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "PREFIX_REASON_CODE",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
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
				name: "winnerCount",
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
	{
		inputs: [
			{
				internalType: "address",
				name: "holder",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "roundId",
				type: "uint256",
			},
		],
		name: "generateSigParam",
		outputs: [
			{
				internalType: "bytes32",
				name: "consumeReasonCode",
				type: "bytes32",
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getLastRoundId",
		outputs: [
			{
				internalType: "uint256",
				name: "result",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "walletAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "page",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "pageSize",
				type: "uint256",
			},
		],
		name: "getUserHistory",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "roundId",
						type: "uint256",
					},
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
						name: "totalAmountSpent",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "totalTicketCount",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "winningTicketCount",
						type: "uint256",
					},
				],
				internalType: "struct LotteryDataLayout.UserHistory[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "roundId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "user",
				type: "address",
			},
		],
		name: "getUserWinCount",
		outputs: [
			{
				internalType: "uint256",
				name: "winCount",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "points",
		outputs: [
			{
				internalType: "contract IPoints",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "rounds",
		outputs: [
			{
				internalType: "bool",
				name: "isOpen",
				type: "bool",
			},
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
				name: "winnerCount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "totalTickets",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "accumulatedAmount",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "accumulatedParticipants",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "userHistories",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
] as const;
