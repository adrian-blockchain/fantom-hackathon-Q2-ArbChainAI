import { useEffect, useState } from 'react';
import { getDataIpfs } from '../utils/ipfsStorage';

export default function Statement({ params }:{params:{
        statementURI:string, gptLawerURI:string
    }
}) {
    const [statement, setStatement] = useState('');
    const [gptLawer, setGptLawer] = useState('');

    useEffect(() => {
        fetchText();
    }, []);

    const fetchText = async () => {
        const _statement = await getDataIpfs(params.statementURI);
        setStatement(_statement);

        const _gptLawer = await getDataIpfs(params.gptLawerURI);
        setGptLawer(_gptLawer);
    };

    return (
        <div>
            <h1>New Page</h1>
            <div>
                <h3>Statement:</h3>
                <p>{statement}</p>
            </div>
            <div>
                <h3>GPT Lawer:</h3>
                <p>{gptLawer}</p>
            </div>
        </div>
    );
}
