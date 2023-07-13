
export default function Footer () {

    return(
            <div className="px-10 mx-auto max-w-7xl static bottom-0">
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <a href="#_" className="flex items-center text-lg font-bold">
                        <svg className="w-4 h-4 mr-1 text-black fill-current" viewBox="0 0 39 15"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
    d="M11.252 1.152C4.184 2.526.454 6.918.061 14.329c1.963-4.049 4.798-5.975 8.503-5.778 2.115.112 3.84 1.295 5.75 2.603 3.11 2.133 6.712 4.601 13.281 3.324 7.068-1.374 10.798-5.766 11.191-13.177-1.963 4.049-4.798 5.975-8.503 5.779-2.115-.113-3.84-1.296-5.75-2.604-3.11-2.133-6.712-4.601-13.281-3.324z"
    fillRule="evenodd"/>
                        </svg>
                        <span className="ml-1">ArbChainAI.</span>
                    </a>
                </div>
                <div className="flex flex-col justify-between mt-5 mb-5 text-center sm:mb-0 sm:mt-12 sm:flex-row">
                    <ul className="flex flex-row justify-center pb-3 -ml-4 -mr-4 text-sm font-bold">
                        <li><a href="#_" className="px-2 text-gray-500 hover:text-gray-600">Contact</a></li>
                        <li><a href="#_" className="px-2 text-gray-500 hover:text-gray-600">About US</a></li>
                        <li><a href="#_" className="px-2 text-gray-500 hover:text-gray-600">FAQ's</a></li>
                        <li><a href="#_" className="px-2 text-gray-500 hover:text-gray-600">Terms</a></li>
                    </ul>
                    <p className="mt-3 text-xs leading-tight text-gray-500 sm:mt-0"> © Copyright 2023</p>

                </div>
            </div>
    )

}
