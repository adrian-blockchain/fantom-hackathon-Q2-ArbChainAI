import { useState, useEffect } from "react";
import {Card, Grid, Text, Textarea} from "@nextui-org/react";
import { ethers } from "ethers";
import {
    getCaseById,
    ArbCase,
    init,
     finalJudgement,
} from "../utils/contractInteraction";
import { useRouter } from "next/router";
import {getDataIpfs, storeToIpfs} from "../utils/ipfsStorage";
import {judgePrompt} from "../utils/juridiquePrompts";
import query from "../utils/sendMessage";

interface ArbChainAiCase {
    caseCreator: string;
    secondPart: string;
    caseId: string;
    caseCreatorsProof: {
        statementURI: string;
        gptLawer: string;
        time: number;
    };
    secondPartProof: {
        statementURI: string;
        gptLawer: string;
        time: number;
    };
    finalJudgementUri: string;
    caseCreatorWon: boolean;
    caseCreatorProofSubmitted: boolean;
    secondPartProofSubmitted: boolean;
    isJudgementFinal: boolean;
}



export default function Judgement({ caseId }) {


    const [caseData, setCaseData] = useState<ArbChainAiCase | null>(null);

    const [judgement, setJudgement] = useState('');
    const [judgementUri, setJudgementUri] = useState('');


    useEffect(() => {
        fetchCaseData();
    }, [caseId]);

    async function fetchCaseData() {
        try {
            await init();
            const arbCase: ArbChainAiCase | null = await getCaseById(caseId);

            setCaseData(arbCase);
            console.log(arbCase?.finalJudgementUri);

            if(arbCase?.finalJudgementUri!==""){
                const _judgement = await getDataIpfs(caseData!.finalJudgementUri);
                console.log(_judgement);
                setJudgement(_judgement);


            }
        } catch (error) {
            console.error("Error fetching case data:", error);
        }
    }

    async function handleStartJudgement() {


        try {
            if (!(caseData) || caseData.caseCreatorsProof.gptLawer !== null && caseData.secondPartProof.gptLawer !== null){
                const lawyer1 = await getDataIpfs(caseData!.caseCreatorsProof.gptLawer);
                const lawyer2 = await getDataIpfs(caseData!.secondPartProof.gptLawer);
                await fetch('/api/createJudgement', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ lawer1:lawyer1, lawer2:lawyer2 }),
                })
                    .then((res) => res.json()) // Convert the Response object to JSON
                    .then(async (data) => {
                        console.log(data);
                        setJudgement(data.response);
                        const judgementURI = await storeToIpfs(data.response);
                        console.log(judgementURI);
                        await finalJudgement(caseId, true, judgementURI);
                        setJudgementUri(judgementURI);
                        // Check the response data

                        // Pass the extracted data to setLawerStatement
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }

            // Optional: Add any additional logic or navigation after starting the judgement
        } catch (error) {
            console.error("Error starting judgement:", error);
        }
    }

    if (!caseData) {
        return (
            <div>
                <h1>Loading case data...</h1>
                <button onClick={fetchCaseData}>Next Step</button>
            </div>
        );
    }

    return (
        <div className="text-center">
            <div className="mx-6 my-4">
                <Card variant="bordered">
                    <h1>Judgement Component</h1>

                    <h2>Case ID: {caseData.caseId}</h2>
                </Card>
            </div>
            <div className="grid grid-cols-2 gap-4 mx-6 my-4">
                <div className="col-span-1">
                    <Card variant="bordered">
                        <h3>Case Creator:</h3>
                        <Text>{caseData.caseCreator}</Text>
                    </Card>
                </div>
                <div className="col-span-1">
                    <Card variant="bordered">
                        <h3>Second Part:</h3>
                        <Text>{caseData.secondPart}</Text>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mx-6 my-4">
                <div className="col-span-1">
                    <Card isPressable isHoverable onClick={handleStartJudgement}>
                        <h3>Case Creator's Proof</h3>
                        <p>Statement URI: {caseData.caseCreatorsProof.statementURI}</p>
                        <p>GPT Lawer: {caseData.caseCreatorsProof.gptLawer}</p>
                        <p>Time: {caseData.caseCreatorsProof.time}</p>
                    </Card>
                </div>
                <div className="col-span-1">
                    <Card variant="bordered">
                        <h3>Second Part's Proof</h3>
                        <p>Statement URI: {caseData.secondPartProof.statementURI}</p>
                        <p>GPT Lawer: {caseData.secondPartProof.gptLawer}</p>
                        <p>Time: {caseData.secondPartProof.time}</p>
                    </Card>
                </div>
            </div>

            <div className="mx-6 my-4">
                <Card variant="bordered">
                    <h3>Final Judgement:</h3>
                    <p>URI: {caseData.finalJudgementUri}</p>
                    <p>Case Creator Won: {caseData.caseCreatorWon ? "Yes" : "No"}</p>
                    <p>
                        Case Creator Proof Submitted:{" "}
                        {caseData.caseCreatorProofSubmitted ? "Yes" : "No"}
                    </p>
                    <p>
                        Second Part Proof Submitted:{" "}
                        {caseData.secondPartProofSubmitted ? "Yes" : "No"}
                    </p>
                    <p>Is Judgement Final: {caseData.isJudgementFinal ? "Yes" : "No"}</p>
                </Card>
            </div>



            {judgement!==""
                ?<div className="w-screen px-2">
                    <Textarea
                        readOnly
                        size={"xl"}
                        rows={20}
                        fullWidth={true}
                        style={{width: '100%', height: '100%', padding: '10px', fontSize: '16px', color: 'black'}}
                        label="final judgement"
                        value={judgement}
                    />
                </div>
                :<div className="w-screen px-2">

                </div>}
            <div>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow" onClick={fetchCaseData}>Reload</button>


                {!caseData.isJudgementFinal && caseData.caseCreatorProofSubmitted && caseData.secondPartProofSubmitted && (
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow" onClick={handleStartJudgement}>Start Judgement</button>
                )}
            </div>

        </div>
    );
}
