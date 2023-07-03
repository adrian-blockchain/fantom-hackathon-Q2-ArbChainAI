import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const FT_TEST_PRIVATE_KEY =process.env.FT_TEST_PRIVATE_KEY
const config: HardhatUserConfig = {

  solidity: "0.8.17",

  networks: {
    fantomTestnet: {
      url: "https://rpc.testnet.fantom.network",
      chainId: 0xfa2,
      accounts:[FT_TEST_PRIVATE_KEY],
      blockGasLimit: 1000000004297200 // whatever you want here
    },
  },


};

export default config;
