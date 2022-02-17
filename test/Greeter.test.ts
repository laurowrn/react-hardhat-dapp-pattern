import { expect } from "./chai-setup";
import { ethers, deployments } from "hardhat";
import { Contract } from "ethers";

describe("Greeter", function () {
  let Greeter: Contract, owner: string, account1: string;
  it("Should return the new greeting once it's changed", async function () {
    await deployments.fixture(["Greeter"]);
    const signers = await ethers.getSigners();
    owner = await signers[0].getAddress();
    Greeter = await ethers.getContract("Greeter", owner);

    expect(await Greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await Greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await Greeter.greet()).to.equal("Hola, mundo!");
  });
});
