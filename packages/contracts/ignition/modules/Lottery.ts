import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Lottery", (m) => {

    const lottery = m.contract("Lottery", []);

    return { lottery };
});