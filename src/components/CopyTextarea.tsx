import { useRef } from 'react';

interface CopyTextareaProps {
    value: string;
}

const CopyTextarea: React.FC<CopyTextareaProps> = ({ value }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleCopyClick = () => {
        if (textareaRef.current) {
            textareaRef.current.select();
            document.execCommand('copy');
        }
    };

    return (
        <div className='w-screen justify-center'>
            <h1 className="text-black text-2xl">Copy and send this code to the second arbitration parts.</h1>
            <div className="flex justify-center mt-5">
            <textarea ref={textareaRef} value={value} className="text-black w-200" readOnly />
            <button className="bg-blue-800 border-r-4" onClick={handleCopyClick}>Copy</button>
            </div>
        </div>
    );
};

export default CopyTextarea;
