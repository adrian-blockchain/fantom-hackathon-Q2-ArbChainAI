import {Blob, NFTStorage} from 'nft.storage'


export const storeToIpfs = async (data:string | undefined): Promise<string> =>{
    try {
        const NFT_STORAGE_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVkZjg5YTk0RTIzOUZlNTIxRTM0NGZDMTM1NmExNTliNjZDNTU0YTciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4ODE1NDA4MTIyNywibmFtZSI6ImFyYmNoYWluYWkifQ.QDEH2RCreQuTjWNiCTQLa7OKwYh3S4sF3lE2Srvh5rs"
        const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
        if (data !== undefined) {
            const blobData = new Blob([data]);

            const cid = await client.storeBlob(<Blob>blobData);
            console.log(cid);
            return cid;
        }
        return ''


    }catch (e) {
        console.log(e)

        return "";

    }

}
// eslint-disable-next-line
export const getDataIpfs = async (uri: string | undefined):Promise<string> => {
    try {
        const response = await fetch(`https://ipfs.io/ipfs/${uri}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data from IPFS');
        }


        return await response.text();
    } catch (error) {
        return ""
        console.log(error);
        // You can handle the error according to your needs
    }
};

