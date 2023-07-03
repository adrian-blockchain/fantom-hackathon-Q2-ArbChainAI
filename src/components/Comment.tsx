import { Textarea } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import {lawerPrompt} from "../utils/juridiquePrompts";

interface CommentProps {
    setStatement: (value: string) => void;
    handleStep: () => void;
    caseId: string;
    setLawerStatement: (value: string) => void;
    lawerStatement: string;
}

export default function Comment({ setStatement, handleStep, caseId, setLawerStatement, lawerStatement}: CommentProps) {
    const [textareaValue, setTextareaValue] = useState('');
    const [isNest, setIsNest] = useState(false);

    const handleChange = (event:any) => {
        setTextareaValue(event.target.value);
    };

    const LawyerStatement = async () => {
        try {
            const prompt = lawerPrompt(caseId,textareaValue);


            await fetch('/api/createMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt }),
            })
                .then((res) => res.json()) // Convert the Response object to JSON
                .then((data) => {
                    console.log(data); // Check the response data
                    setLawerStatement(data.response); // Pass the extracted data to setLawerStatement
                })
                .catch((e) => {
                    console.log(e);
                });


            //setLawerStatement("blablabla")



        } catch (error) {
            console.error('Error:', error);
            // Handle error state
        } finally {
            setIsNest(false);
            validate();
        }
    };

    const validate = () => {

        if (isNest) {
            handleStep();
        } else {
            setStatement(textareaValue);
            setIsNest(true);
        }
    };

    useEffect(() => {
        if (lawerStatement && textareaValue) {
            validate();
        }
    }, [lawerStatement, textareaValue]);

    return (
        <div className="py-7 mx-auto mt-px text-center">
            <div className="  mx-auto ">
                <div className="h-auto w-screen p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
                    <h1 className="mb-6 text-2xl font-medium text-black">Comment Component</h1>
                    <Textarea
                        size="xl"
                        label=""
                        rows={10}
                        fullWidth={true}
                        style={{width: '100%', height: '400px', padding: '10px', fontSize: '16px', color: 'black'}}
                        placeholder="In this step, you need to provide all the relevant details of your arbitration case. There will be a dedicated section where you, as well as the other stakeholders, can enter the necessary information. Once you have filled in the details, click on 'Validate' to proceed."
                        value={textareaValue}
                        onChange={handleChange}
                    />
                    <div className="mt-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                            onClick={LawyerStatement}
                        >
                            {isNest ? 'Next' : 'Validate'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
