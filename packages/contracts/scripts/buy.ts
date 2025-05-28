import { ethers, network } from "hardhat";
import { CustomConfig, isValidNetwork } from "./config";
import { Lottery } from "../typechain-types";

async function main() {
	const [deployer] = await ethers.getSigners();
	const networkName = network.name;

	if (!isValidNetwork(networkName)) {
		throw new Error("Invalid network");
	}

	const { lotteryContract } = CustomConfig[networkName];

	const ContractFactory = await ethers.getContractFactory("Lottery");
	const lottery = ContractFactory.attach(lotteryContract) as Lottery;

	const lastRoundId = await lottery.getLastRoundId();

	console.log("Last round id:", lastRoundId);

	const [consumeReasonCode, nonce] = await lottery.generateSigParam(
		deployer.address,
		lastRoundId
	);

	const domain = {
		name: "Points",
		version: "1.0",
		chainId: network.config.chainId,
		verifyingContract: await lottery.points(),
	};

	const types = {
		Consume: [
			{ name: "holder", type: "address" },
			{ name: "spender", type: "address" },
			{ name: "amount", type: "uint256" },
			{ name: "reasonCode", type: "bytes32" },
			{ name: "deadline", type: "uint256" },
			{ name: "nonce", type: "uint256" },
		],
	};
	const value = {
		holder: deployer.address,
		spender: lotteryContract,
		amount: 100,
		reasonCode: consumeReasonCode,
		deadline: Math.floor(Date.now() / 1000) + 1 * 60 * 60,
		nonce: nonce,
	};

	console.log("Domain: ", domain);

	console.log("Types:", types);

	console.log("Value:", value);

	const signature = await deployer.signTypedData(domain, types, value);

	const tx = await lottery.buy(
		lastRoundId,
		value.amount,
		signature,
		value.deadline
	);

	await tx.wait();

	console.log("Buy success, hash:", tx.hash);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
