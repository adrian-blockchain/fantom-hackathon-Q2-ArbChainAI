import {Blob, NFTStorage} from 'nft.storage'






export const storeToIpfs = async (data:string): Promise<string> =>{
    try {
        const NFT_STORAGE_TOKEN =process.env.IPFS_API_KEY
        const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

        const blobData = new Blob([data])

        const cid =  await client.storeBlob(<Blob>blobData);

        console.log(cid);
        return cid;

    }catch (e) {
        console.log(e)

    }

}

export const getDataIpfs = async (uri: string | undefined):Promise<string> => {
    try {
        const response = await fetch(`https://ipfs.io/ipfs/${uri}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data from IPFS');
        }


        return await response.text();
    } catch (error) {
        console.log(error);
        // You can handle the error according to your needs
    }
};

