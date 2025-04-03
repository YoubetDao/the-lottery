import { ethers } from "hardhat";
import { expect } from "chai";
import { Lottery } from "../typechain-types";
import { VRFCoordinatorV2Mock } from "../typechain-types";
import { BigNumber, ContractReceipt } from "ethers";

describe("Lottery VRF Tests", function () {
  let lottery: Lottery;
  let vrfCoordinator: VRFCoordinatorV2Mock;

  before(async function () {
    // Deploy mock VRF Coordinator
    const VRFCoordinator = await ethers.getContractFactory("VRFCoordinatorV2Mock");
    vrfCoordinator = await VRFCoordinator.deploy(0, 0);
    
    // Create subscription
    await vrfCoordinator.createSubscription();
    await vrfCoordinator.fundSubscription(1, ethers.utils.parseEther("1"));

    // Deploy Lottery contract
    const Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy(
      vrfCoordinator.address, // VRF Coordinator
      1, // Subscription ID
      "0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314", // Key Hash
      100000 // Callback Gas Limit
    );

    // Add Lottery as consumer
    await vrfCoordinator.addConsumer(1, lottery.address);
  });

  it("Should create a round and draw with VRF", async function () {
    // Get current block timestamp
    const block = await ethers.provider.getBlock("latest");
    const now = block.timestamp;
    
    // Create a test round
    await lottery.createRound(
      now, // startTime (now)
      now + 3600, // endTime (1 hour later)
      ethers.utils.parseEther("1"), // rewardAmount (1 ETH)
      1 // winnerCount
    );

    // Fast forward time to end of round (add extra buffer time)
    await ethers.provider.send("evm_increaseTime", [7200]); // 2 hours
    await ethers.provider.send("evm_mine", []);

    // Draw the round
    const tx = await lottery.draw(0);
    const receipt: ContractReceipt = await tx.wait();

    // Check for DrawStarted event
    const drawStartedEvent = receipt.events?.find(
      (e: any) => e.event === "DrawStarted"
    );
    expect(drawStartedEvent).to.not.be.undefined;

    // Get requestId from event
    const requestId = drawStartedEvent?.args?.requestId;

    // Mock VRF response
    await vrfCoordinator.fulfillRandomWords(
      requestId, 
      lottery.address
    );

    // Check for DrawCompleted event
    const filter = lottery.filters.DrawCompleted(0);
    const events = await lottery.queryFilter(filter);
    expect(events.length).to.equal(1);
    const randomNumber = events[0].args?.randomNumber;
    console.log("Generated random number:", randomNumber.toString());
    expect(randomNumber).to.be.instanceOf(BigNumber);
  });
});
