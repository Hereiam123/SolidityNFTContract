const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("check-balance", "Prints out the balance of your account").setAction(
  async function (taskArguments, hre) {
    const account = getAccount();
    console.log(
      `Account balance for ${account.address}: ${await account.getBalance()}`
    );
  }
);

task("withdraw", "*** Transfer the ETH hold by the SC to the account")
.setAction(async function (taskArguments, hre) {
    const account = getAccount();
    const contract = await getContract("NFT", hre);
    const transactionResponse = await contract.withdrawPayments(account.address,
    {
        gasLimit: 500_000,
    });
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
});

task("deploy", "Deploys the NFT.sol contract").setAction(async function (
  taskArguments,
  hre
) {
  const nftContractFactory = await hre.ethers.getContractFactory(
    "NFT",
    getAccount()
  );
  const nft = await nftContractFactory.deploy();
  console.log(`Contract deployed to address: ${nft.address}`);
});
