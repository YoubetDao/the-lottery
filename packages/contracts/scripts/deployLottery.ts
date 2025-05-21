import { ethers, network } from "hardhat";
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

	console.log("Lottery contract deployed to:", await lottery.getAddress());
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
