"use client"; // This is a client component

import { useState } from 'react';
import Connect from '../components/Connect';
import Create from '../components/Create';
import Comment from '../components/Comment';
import Judgement from '../components/Judgement';
import LawerStatement from "../components/LawerStatement";
import { useRouter } from "next/navigation";
import {StatementProof} from "../utils/contractInteraction";
import Footer from "../components/Footer";
import Header from "../components/Header";
export default function Home() {


    const [step, setStep] = useState(0);
  const [account, setAccount] = useState("");
  const [caseId, setCaseId] = useState("");
  const [statement, setStatement] = useState("");
  const [lawerStatement, setLawerStatement] = useState("");

    const router = useRouter();


    const handleStep = () => {
      if (step === 0 && account !== "Not Connected") {
          setStep(1);
      } else if (step === 1 && caseId !== "") {
          console.log("2")
          setStep(2);
      } else if (step === 2 && statement !== "") {
          console.log("3")

          setStep(3);
      } else if (step === 3 && lawerStatement !== "") {
          setStep(4);
      }
  };

  const pushToStatements = async (statements:StatementProof)=> {
      const { statementURI, gptLawer, time } = statements;

      router.push(`/statement?statement=${statementURI}&gptLawer=${gptLawer}&time=${time}`);


  }

  const conditionalComponent = () => {
    switch (step) {
      case 0:
        return <Connect setAccount={setAccount} handleStep={handleStep} />;
      case 1:
        return <Create setCaseId={setCaseId} handleStep={handleStep} account={account}/>;
      case 2:
        return <Comment setStatement={setStatement} handleStep={handleStep} caseId={caseId} setLawerStatement={setLawerStatement} lawerStatement={lawerStatement} />;
      case 3:
        return <LawerStatement setLawerStatement={setLawerStatement}  handleStep={handleStep} lawerStatement={lawerStatement} caseId={caseId} statement={statement}/>;
      case 4:
        return <Judgement caseId={caseId}  />;
      default:
        return <Connect setAccount={setAccount} handleStep={handleStep} />;
    }
  };

  return (
      <div className="h-screen pt-10 max-w-screen-2xl text-center items-center justify-between ml-30 mr-30" style={{ backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" }}>
          <Header address={account}/>
          <div className="mb-auto ">
        {conditionalComponent()}
          </div>
          <div className="flex-grow static bottom-0">


          <Footer/>
          </div>

      </div>
  );

}
