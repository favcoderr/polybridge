const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContract.json");
const contractJSON = require("../artifacts/contracts/LekanToken.sol/LekanToken.json");

const contractAddress = "0xd2900f9d8bc61337bF251b4ca5A2c32eb6373c53";
const contractABI = contractJSON.abi;
const fxERC721ContractAddress = "0x34F5A25B627f50Bb3f5cAb72807c4D4F405a9232";
const walletAddress = "0xb49e01B29BAd2c70a331fc876b129457542F7563";

async function main() {
  const contract = await hre.ethers.getContractAt(contractABI, contractAddress);
  const fxContract = await hre.ethers.getContractAt(
    fxRootContractABI,
    fxERC721ContractAddress
  );
  const totalNFTs = await contract.totalSupply();
  for (let i = 0; i < totalNFTs; i++) {
    const approveTx = await contract.approve(fxERC721ContractAddress, i);
    await approveTx.wait();
    console.log(`NFT with tokenId ${i} approved`);
  }
  console.log("NFTs approved");

  for (let i = 0; i < totalNFTs; i++) {
    const depositTx = await fxContract.deposit(
      contractAddress,
      walletAddress,
      i,
      "0x6556"
    );
    await depositTx.wait();
    console.log(`NFT with TokenId ${i} deposited`);
  }

  console.log("NFTs deposited");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
