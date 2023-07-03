import { ethers } from "ethers";
import ArbChainAi from "../artifacts/contracts/ArbChainAi.sol/ArbChainAi.json";
import {judgePrompt} from "./juridiquePrompts";

export interface ArbCase {
    caseCreator: string;
    secondPart: string;
    caseId: string;
    caseCreatorsProof: StatementProof;
    secondPartProof: StatementProof;
    finalJudgementUri: string;
    caseCreatorWon: boolean;
    caseCreatorProofSubmitted: boolean;
    secondPartProofSubmitted: boolean;
    isJudgementFinal: boolean;
}

export interface StatementProof {
    statementURI: string;
    gptLawer: string;
    time: number;
}

let provider: ethers.providers.Web3Provider;
let signer: ethers.Signer;
let contract: ethers.Contract;

export async function init(): Promise<void> {
    provider = new ethers.providers.Web3Provider((window as any).ethereum);

    // Connect to the Ethereum network
    signer = provider.getSigner();
    const contractAddress = "0x0F908aEBac676f27FE3E7da1382790255d066D0b";

    // Create an instance of the contract
    contract = new ethers.Contract(contractAddress, ArbChainAi.abi, signer);
}

// Create a case

export async function createCase(): Promise<string> {
    try {
        const createCaseTx = await contract.createCase();
        const receipt = await createCaseTx.wait();

        const events = receipt.events;
        console.log(events[0].args.caseId)
        const caseId = events[0].args.caseId;

        if (caseId) {
            return caseId.toString();
        } else {
            throw new Error('Failed to retrieve caseId from logs');
        }
    } catch (e) {
        console.log(e);
        throw new Error('Failed to create case');
    }
}


// Connect the second part to a case
export async function secondPartConnect(caseId: string): Promise<void> {
    const casearb = await getCaseById(caseId)
    console.log(casearb)
    const secondPartConnectTx = await contract.secondPartConnect(caseId);
    console.log(secondPartConnectTx);
    await secondPartConnectTx.wait();
}

// Update the statement proof
export async function updateStatementProof(
    statementURI: string,
    gptLawer: string,
    caseId: string
): Promise<void> {
    try {
        const updateStatementProofTx = await contract.updateStatementProof(
            statementURI,
            gptLawer,
            caseId
        );
        await updateStatementProofTx.wait();
    }catch (e) {
        console.log(e)

    }

}

// Finalize the judgement
export async function finalJudgement(
    caseId: string,
    judgement: boolean,
    finalJudgementUri: string
): Promise<void> {
    const finalJudgementTx = await contract.finalJudgement(
        caseId,
        judgement,
        finalJudgementUri
    );
    await finalJudgementTx.wait();
    console.log(finalJudgementTx);
}

export async function getCaseById(caseId: string): Promise<ArbCase | null> {
    try {
        const caseData = await contract.getCase(caseId);

        const arbCase: ArbCase = <ArbCase>{
            caseCreator: caseData[0],
            secondPart: caseData[1],
            caseId:caseId,
            isJudgementFinal: caseData[2],
            caseCreatorProofSubmitted: caseData[3],
            secondPartProofSubmitted: caseData[4],
            caseCreatorWon: caseData[5],
            finalJudgementUri: caseData[6]
        };

        // Fetch additional data from mappings
        const caseCreatorsProof = await contract.caseCreatorsProofs(caseId);
        const secondPartProof = await contract.secondPartProofs(caseId);

        arbCase.caseCreatorsProof = {
            statementURI: caseCreatorsProof.statementURI,
            gptLawer: caseCreatorsProof.gptLawer,
            time: caseCreatorsProof.time.toNumber()
        };

        arbCase.secondPartProof = {
            statementURI: secondPartProof.statementURI,
            gptLawer: secondPartProof.gptLawer,
            time: secondPartProof.time.toNumber()
        };

        return arbCase;
    } catch (error) {
        console.log("Error getting case:", error);
        return null;
    }
}


