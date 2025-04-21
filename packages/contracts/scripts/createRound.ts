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
    const lottery = await ContractFactory.attach(contractAddress) as Lottery;

	console.log(`Will create round with the account: ${deployer.address}, isOwner: ${deployer.address === await lottery.owner()}`);


    const tx = await lottery.createRound(
        1745333453,
        1745938253, 
        ethers.parseEther("1"),
        5
    );
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
