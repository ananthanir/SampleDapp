require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "local",
  networks: {
    local: {
      url: `${process.env.LOCAL_RPC}`,
    },
    sepolia: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "../api/artifacts",
  },
};