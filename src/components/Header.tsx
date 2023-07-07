
export default function Header ({address}) {

    return(
            <div className="flex items-center justify-between h-16 px-8 mx-auto max-w-7xl">
                <a href="#_"
                   className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-white select-none">ArbChainAI.</a>
                <a className="flex items-center text-black">
                    {address}
                </a>
                <a href={"https://github.com/adrian-blockchain/fantom-hackathon-Q2-ArbChainAI"} target="_blank"
                   className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium leading-tight text-blue-500 whitespace-no-wrap border border-blue-300 rounded-full shadow-sm bg-blue-50 focus:ring-offset-blue-600 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100"
                   data-rounded="rounded-full" data-primary="blue-500">
                    github
                </a>
            </div>
    )

}
