import env, { ethers, network } from "hardhat";
import { CustomConfig, isValidNetwork } from "./config";

async function main() {
	const [owner] = await ethers.getSigners();

	const networkName = network.name;

	if (!isValidNetwork(networkName)) {
		throw new Error(`Invalid network: ${networkName}`);
	}

	const { lotteryContract, pointsContract } = CustomConfig[networkName];

	// verify logic
	await env.run("verify:verify", {
		address: lotteryContract,
		constructorArguments: [owner.address, pointsContract],
		contract: "contracts/Lottery.sol:Lottery",
	});
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
