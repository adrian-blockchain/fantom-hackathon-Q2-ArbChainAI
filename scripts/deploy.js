import { ethers } from "hardhat";

async function main() {



  const arbChainAI = await ethers.deployContract("ArbChainAi");

  await arbChainAI.waitForDeployment();

  console.log("Token address:", await arbChainAI.getAddress());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
