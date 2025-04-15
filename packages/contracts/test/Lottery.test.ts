import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import { expect } from "chai";
import { ethers, artifacts } from "hardhat";

describe("Lottery", function () {
    async function deployFixture() {

        const [owner, user1, user2] = await ethers.getSigners();
        // 部署 MockPoints 合约
        const MockPoints = await ethers.getContractFactory("MockPoints");
        const points = await MockPoints.deploy();
        const pointsAddress = await points.getAddress();

        // 部署 Lottery 合约，注入 Points 合约地址
        const Lottery = await ethers.getContractFactory("Lottery");
        const lottery = await Lottery.deploy(owner.address, pointsAddress);
        const lotteryAddress = await lottery.getAddress();

        const now = await time.latest();
        const roundStartTime = now + 60;
        const roundEndTime = now + 3600;

        console.log("Owner address:", owner.address);
        console.log("User1 address:", user1.address);
        console.log("User2 address:", user2.address);

        console.log("Points address:", pointsAddress);
        console.log("Lottery address:", lotteryAddress);
        const artifact = await artifacts.readArtifact("MockPoints");
        console.log("Points ABI:", artifact.abi);

        console.log("Current time:", new Date(now * 1000).toLocaleString());
        console.log("this round will start in one minute, end in one hour.");
        console.log("Round start time:", new Date(roundStartTime * 1000).toLocaleString());
        console.log("Round end time:", new Date(roundEndTime * 1000).toLocaleString());

        return { owner, user1, user2, points, lottery, roundStartTime, roundEndTime };
    }

    describe("constructor", function () {
        it("should revert if points address is zero", async () => {
            const [owner] = await ethers.getSigners();
            const Lottery = await ethers.getContractFactory("Lottery");
            await expect(
                Lottery.deploy(owner.address, ethers.ZeroAddress)
            ).to.be.revertedWith("Invalid points contract address");
        });
    });

    describe("createRound", function () {
        it("should allow owner to create round", async () => {
            const { lottery, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
        });

        it("should revert if non-owner tries to create round", async () => {
            const { lottery, user1, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await expect(
                lottery.connect(user1).createRound(roundStartTime, roundEndTime, 1000, 2)
            ).to.be.revertedWithCustomError(lottery, "OwnableUnauthorizedAccount");
        });

        it("should revert if startTime >= endTime", async () => {
            const { lottery } = await loadFixture(deployFixture);
            const now = await time.latest();
            await expect(
                lottery.createRound(now + 3600, now + 3600, 1000, 1)
            ).to.be.revertedWith("Start time must be before end time");
        });

        it("should revert if reward is 0", async () => {
            const { lottery, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await expect(
                lottery.createRound(roundStartTime, roundEndTime, 0, 1)
            ).to.be.revertedWith("Reward amount must be greater than 0");
        });

        it("should revert if winner count is 0", async () => {
            const { lottery, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await expect(
                lottery.createRound(roundStartTime, roundEndTime, 1000, 0)
            ).to.be.revertedWith("Winer count must be greater than 0");
        });

        it("should revert if winner count is 0", async () => {
            const { lottery, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await expect(
                lottery.createRound(roundStartTime, roundEndTime, 1000, 0)
            ).to.be.revertedWith("Winer count must be greater than 0");
        });
    });

    describe("buy", function () {
        it("should allow user to buy and call consume()", async () => {
            const { lottery, user1, roundStartTime, roundEndTime } = await loadFixture(deployFixture);

            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
            await time.increaseTo(roundStartTime + 2);

            const deadline = (await time.latest()) + 300;
            const signature = "0x";

            await expect(
                lottery.connect(user1).buy(1, 10, signature, deadline)
            ).to.emit(lottery, "LotteryTicketBought").withArgs(1, user1.address, 10);
        });

        it("should revert if roundId is invalid", async () => {
            const { lottery, user1 } = await loadFixture(deployFixture);
            await expect(
                lottery.connect(user1).buy(999, 10, "0x", (await time.latest()) + 300)
            ).to.be.revertedWith("Invalid round ID");
        });

        it("should revert if amount is 0", async () => {
            const { lottery, user1, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
            await time.increaseTo(roundStartTime + 2);
            const deadline = (await time.latest()) + 300;
            await expect(
                lottery.connect(user1).buy(1, 0, "0x", deadline)
            ).to.be.revertedWith("Amount must be greater than 0");
        });

        it("should revert if round has not started", async () => {
            const { lottery, user1, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
            await expect(
                lottery.connect(user1).buy(1, 10, "0x", (await time.latest()) + 300)
            ).to.be.revertedWith("Round has not started");
        });

        it("should revert if round has ended", async () => {
            const { lottery, user1, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
            await time.increaseTo(roundEndTime + 10);
            await expect(
                lottery.connect(user1).buy(1, 10, "0x", (await time.latest()) + 300)
            ).to.be.revertedWith("Round has ended");
        });

        it("should revert if deadline has passed", async () => {
            const { lottery, user1, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
            await time.increaseTo(roundStartTime + 2);
            await expect(
                lottery.connect(user1).buy(1, 10, "0x", (await time.latest()) - 10)
            ).to.be.revertedWith("Deadline must be in the future");
        });

        it("should revert if round is closed", async () => {
            const { lottery, user1, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);

            await time.increaseTo(roundStartTime + 2);
            const deadline = (await time.latest()) + 300;

            await lottery.connect(user1).buy(1, 10, "0x", deadline);
            await time.increaseTo(roundEndTime + 5);
            await lottery.draw(0);

            await expect(
                lottery.connect(user1).buy(1, 10, "0x", deadline)
            ).to.be.revertedWith("Round is not open");
        });
    });

    describe("draw", function () {
        it("should correctly draw winners", async () => {
            const { lottery, user1, user2, roundStartTime, roundEndTime } = await loadFixture(deployFixture);

            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
            await time.increaseTo(roundStartTime + 2);

            const deadline = (await time.latest()) + 300;
            await lottery.connect(user1).buy(1, 5, "0x", deadline);
            await lottery.connect(user2).buy(1, 5, "0x", deadline);

            await time.increaseTo(roundEndTime + 10);

            await expect(lottery.draw(0)).to.emit(lottery, "WinnersSelected");
        });

        it("should revert if non-owner tries to draw", async () => {
            const { lottery, user1, roundStartTime, roundEndTime } = await loadFixture(deployFixture);

            await lottery.createRound(roundStartTime, roundEndTime, 1000, 2);
            await time.increaseTo(roundStartTime + 1);

            await lottery.connect(user1).buy(1, 1, "0x", roundEndTime - 100);
            await time.increaseTo(roundEndTime + 10);

            await expect(
                lottery.connect(user1).draw(0)
            ).to.be.revertedWithCustomError(lottery, "OwnableUnauthorizedAccount");
        });

        it("should revert if roundId is out of range", async () => {
            const { lottery } = await loadFixture(deployFixture);
            await expect(
                lottery.draw(999)
            ).to.be.revertedWith("Invalid round ID");
        });

        it("should revert if round has not ended", async () => {
            const { lottery, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
            await expect(
                lottery.draw(0)
            ).to.be.revertedWith("Round not ended");
        });

        it("should revert if round is closed", async () => {
            const { lottery, user1, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
            await time.increaseTo(roundStartTime + 2);
            const deadline = (await time.latest()) + 300;
            await lottery.connect(user1).buy(1, 10, "0x", deadline);
            await time.increaseTo(roundEndTime + 10);
            await lottery.draw(0); // 第一次 draw
            await expect(
                lottery.draw(0) // 再次 draw，应报错
            ).to.be.revertedWith("Round already closed");
        });

        it("should revert if no participants", async () => {
            const { lottery, roundStartTime, roundEndTime } = await loadFixture(deployFixture);
            await lottery.createRound(roundStartTime, roundEndTime, 1000, 1);
            await time.increaseTo(roundEndTime + 10);
            await expect(
                lottery.draw(0)
            ).to.be.revertedWith("No participants");
        });
    });
});