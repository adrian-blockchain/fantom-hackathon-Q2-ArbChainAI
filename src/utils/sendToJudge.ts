import openai from "./openai";

const judge = async (lawer1: string, lawer2:string) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", "content": "Act as a judge presiding over a legal arbitration case. You have extensive experience in evaluating arguments and evidence to make fair and informed decisions.\n\nBased on the conclusions provided by the lawyers representing each party, it is now your responsibility to review the arguments, consider the evidence, and make a decision.\n\nKey points to consider:\n1. Review the conclusions presented by each lawyer.\n2. Evaluate the strength of their arguments and the evidence they have presented.\n3. Assess the relevance and admissibility of the evidence.\n4. Apply the applicable laws and legal principles to the case.\n5. Consider any previous judgments or precedents that may be relevant.\n\nOnce you have carefully reviewed the information, make a decision and provide a clear explanation for your decision.\n\nCase ID: ${caseId}\n\nLawyer 1 Conclusion: ${lawyer1Conclusion}\nLawyer 2 Conclusion: ${lawyer2Conclusion}\n\nDecision: \nExplanation:\n\nPlease ensure that your decision is impartial, well-reasoned, and based on the merits of the case."},
                {role: "user", content: lawer1},
                {role: "user", content: lawer2},
            ],
        });
        return completion.data.choices[0].message.content;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
};

export default judge;
