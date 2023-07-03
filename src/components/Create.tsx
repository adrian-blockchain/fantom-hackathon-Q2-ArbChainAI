import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import {
    createCase,
    secondPartConnect,
    init, ArbCase, getCaseById,
} from "../utils/contractInteraction";
import Judgement from "./Judgement";
import CopyTextarea from "../components/CopyTextarea";

export default function Create({ setCaseId, handleStep, account }) {
    const [showJoinButton, setShowJoinButton] = useState(false);
    const [caseIdValue, setCaseIdValue] = useState("");
    const [caseCreated, setCaseCreated] = useState(false);

    const handleCreate = async () => {
        if (caseCreated) {
            handleStep();
        } else {
            await init();
            const caseId = await createCase();
            setCaseIdValue(caseId);
            setCaseId(caseId);
            setCaseCreated(true);
            handleStep();
        }
    };

    const handleCaseIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setCaseIdValue(value);
        setShowJoinButton(value !== "");
    };

    const handleJoin = async () => {
        await init();
        const caseData:ArbCase | null = await getCaseById(caseIdValue);
        if(!(caseData) || caseData.secondPart == account){
            handleStep()
        }else {
            await secondPartConnect(caseIdValue);
            setCaseId(caseIdValue);
            setCaseCreated(true);
            handleStep();
        }


    };

    const handleCopyClick = () => {
        document.execCommand("copy");
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-gray-200 p-10">
                <h1 className="mb-6 text-2xl font-medium text-center text-black">
                    You are creating a new juridical arbitration case
                </h1>
                <div className="flex justify-center">
                    <Button onClick={handleCreate} auto>
                        {caseCreated ? "Next" : "Create"}
                    </Button>
                </div>

                {caseCreated ? (
                    <div className="mt-4">                        <CopyTextarea value={caseIdValue} />
                    </div>
                ) : (
                    <div>
                    </div>
                )}
            </div>
            {caseCreated ? (
                <div></div>
            ) : (
                <div className="flex-1 bg-white p-10">
                    <h1 className="mb-6 text-2xl font-medium text-center text-black">
                        Enter the case ID to become the second part of the arb case
                    </h1>
                    <div className="flex justify-center">
                        <div className="w-1/2">
                            <Input
                                width="300px"
                                placeholder="Case ID"
                                value={caseIdValue}
                                onChange={handleCaseIdChange}
                            />
                            {showJoinButton && (
                                <div className="pt-12">
                                    <Button onClick={handleJoin}>Join</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
