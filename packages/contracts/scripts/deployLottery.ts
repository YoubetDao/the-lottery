import env, { ethers, network } from "hardhat";
import { CustomConfig, isValidNetwork } from "./config";

async function main() {
	const [deployer] = await ethers.getSigners();
	const networkName = network.name;

	if (!isValidNetwork(networkName)) {
		throw new Error("Invalid network");
	}

	console.log("Deploying contracts with the account:", deployer.address);
	console.log(
		"Account balance:",
		ethers.formatEther(await ethers.provider.getBalance(deployer.address))
	);

	const Lottery = await ethers.getContractFactory("Lottery");
	const lottery = await Lottery.deploy(
		deployer.address,
		CustomConfig[networkName].pointsContract
	);

	const lotteryAddress = await lottery.getAddress();
	console.log("Lottery contract deployed to:", lotteryAddress);

	// Wait for 2 seconds to ensure the contract is properly deployed
	await new Promise((resolve) => setTimeout(resolve, 5000));

	// verify logic
	await env.run("verify:verify", {
		address: lotteryAddress,
		constructorArguments: [
			deployer.address,
			CustomConfig[networkName].pointsContract,
		],
		contract: "contracts/Lottery.sol:Lottery",
	});
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
