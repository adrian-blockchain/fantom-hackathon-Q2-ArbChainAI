import {  useState } from "react";
import { ethers } from "ethers";

export default function Connect({ setAccount, handleStep }: { setAccount: (account: string) => void, handleStep: () => void }) {
    const [connected, setConnected] = useState<boolean>(false);




    const connectWallet = async () => {
        // eslint-disable-next-line
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        const network = await provider.getNetwork();
        console.log(network)

        if ((window as any).ethereum) {
            const network = await provider.getNetwork();


            // Fantom Testnet's chainId is 0xfa2
            if (network.chainId !== 0xfa2) {
                try {
                    await (window as any).ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [{
                            chainId: "0xfa2",
                            rpcUrls: ["https://rpc.testnet.fantom.network"],
                            chainName: "Fantom Testnet",
                            nativeCurrency: {
                                name: "FTM",
                                symbol: "FTM",
                                decimals: 18
                            },
                            blockExplorerUrls: ["https://polygonscan.com/"]
                        }]
                    });
                } catch (error) {
                    console.log("Failed to setup the network.", error);
                    return;
                }
            }

            try {
                await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
                const signer = await provider.getSigner();
                const signedAddress = await signer.getAddress();
                setAccount(signedAddress);
                setConnected(true);
                handleStep();
            } catch (error) {
                console.log("Failed to connect to the wallet.", error);
            }
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    };



    return (
        <div className="py-32 mx-auto mt-px">
            <div className="relative items-center  mt-16 mx-auto tails-selected-element flex">
                <div className="z-10 h-auto mx-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7 tails-selected-element">
                    <h1 className="mb-6 text-2xl font-medium text-center text-black">Connect Component</h1>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
                        onClick={connectWallet}
                    >
                        {connected ? "Next" : "Connect Wallet"}
                    </button>
                </div>
            </div>
        </div>
    );
}
