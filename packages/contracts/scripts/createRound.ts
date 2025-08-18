import { ethers, network } from "hardhat";
import { CustomConfig, isValidNetwork } from "./config";
import { Lottery } from "../typechain-types";
async function main() {
	const [deployer] = await ethers.getSigners();
	const networkName = network.name;

	if (!isValidNetwork(networkName)) {
		throw new Error("Invalid network");
	}

	const contractAddress = CustomConfig[networkName].lotteryContract;
	console.log("Lottery contract address:", contractAddress);

	const ContractFactory = await ethers.getContractFactory("Lottery");
	const lottery = (await ContractFactory.attach(contractAddress)) as Lottery;

	console.log(
		`Will create round with the account: ${deployer.address}, isOwner: ${
			deployer.address === (await lottery.owner())
		}`
	);

	// params to replace, timestamp in seconds
	const startTime = 0;
	const endTime = 0;

	const prizeTiers: bigint[] = [
		// ethers.parseEther("0.03"), example first prize
		// ethers.parseEther("0.02"), example second prize
		// ethers.parseEther("0.01"), example third prize
	];

	if (startTime === 0 || endTime === 0 || prizeTiers.length === 0) {
		throw new Error("startTime, endTime and prizeTiers must all be set");
	}

	console.log("startTime:", new Date(startTime * 1000).toLocaleString());
	console.log("endTime:", new Date(endTime * 1000).toLocaleString());

	const tx = await lottery.createRound(startTime, endTime, prizeTiers);
	await tx.wait();

	console.log("New round created successfully");
	console.log("Transaction hash:", tx.hash);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
