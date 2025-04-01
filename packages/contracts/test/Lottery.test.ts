import { ignition } from "hardhat";
import { expect } from "chai"
import Lottery from "../ignition/modules/Lottery";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { Lottery as LotteryContract } from "../typechain-types";

describe('The Lottery contract', function () {

    async function deployLotteryFixture() {
        const { lottery } = await ignition.deploy(Lottery);
        return { lottery: lottery as unknown as LotteryContract };
    }

    describe('Should deploy success', function () {
        it('should be deployed successfully', async function () {

            const { lottery } = await loadFixture(deployLotteryFixture)

            expect(await lottery.getAddress()).to.not.be.undefined;
        });
    });
});
