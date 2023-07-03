import { useState, useEffect } from 'react';
import { Spinner , Textarea} from '@nextui-org/react';
import {updateStatementProof} from "../utils/contractInteraction"
import {storeToIpfs} from "../utils/ipfsStorage";

interface LawerStatementProps {
    setLawerStatement: (value: string) => void;
    handleStep: () => void;
    statement: string;
    caseId: string;
}

export default function LawerStatement({setLawerStatement,
                                           handleStep,
                                           lawerStatement,
                                           caseId,
    statement
                                       }: LawerStatementProps) {
    const [isLoading, setIsLoading] = useState(true);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLawerStatement(event.target.value);
    }

    const validLawerStatement = async ()=>{
        try {
            const statementURI = await storeToIpfs(statement);
            const gptStatementURI = await storeToIpfs(lawerStatement);

            await updateStatementProof(
                statementURI,
                gptStatementURI,
                caseId
            )
            handleStep()
        }catch (e){
            console.log(e);
        }
    }



    return (
        <div className="py-4 mx-auto mt-px text-center">
            <div className="relative mx-auto">
                <div className="h-auto py-5 w-screen px-2 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-3">            {isLoading ?  (
                <div className="mx-6 ">
                    <h1 className="text-black text-2xl my-4">Lawyer Statement:</h1>
                    <Textarea
                        size={"xl"}
                        rows={20}
                        fullWidth={true}
                        style={{width: '100%', height: '400px', padding: '10px', fontSize: '16px', color: 'black'}}
                        value={lawerStatement}
                        onChange={handleInputChange}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 mt-4 text-white rounded shadow"
                        onClick={validLawerStatement}
                    >
                        Valid
                    </button>
                </div>
            ): (
                <div>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                    >
                        Judgement
                    </button>
                    <Spinner />
                </div>
            )}
        </div>
            </div>
        </div>
    );
}
