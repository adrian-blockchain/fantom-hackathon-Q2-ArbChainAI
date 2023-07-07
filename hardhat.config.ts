import { HardhatUserConfig } from "hardhat/config";


const config: HardhatUserConfig = {

  solidity: "0.8.17",

  networks: {
    fantomTestnet: {
      url: "https://rpc.testnet.fantom.network",
      chainId: 0xfa2,
      accounts:[`0x1dd7e9df8048bf39a3577245983022ce6a390aee5ed61767662d7093e7778dea`],
      blockGasLimit: 1000000004297200 // whatever you want here
    },
  },


};

export default config;
