const hre = require("hardhat");
const contractJSON = require("../artifacts/contracts/LekanToken.sol/LekanToken.json");

const contractAddress = "0xd2900f9d8bc61337bF251b4ca5A2c32eb6373c53";
const contractABI = contractJSON.abi;
const walletAddress = "0xb49e01B29BAd2c70a331fc876b129457542F7563";
let noOfNFTs = 5;
async function main() {
  const contract = await hre.ethers.getContractAt(contractABI, contractAddress);

  const tx = await contract.mint(walletAddress, noOfNFTs);
  await tx.wait();

  console.log(
    walletAddress +
      " now has: " +
      (await contract.balanceOf(walletAddress)) +
      " NFTs"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
