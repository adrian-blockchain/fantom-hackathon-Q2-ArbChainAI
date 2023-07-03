export const lawerPrompt = (caseId, textareaValue):string => {
  return `Act as an expert legal writer with 10 years of experience drafting legal documents, particularly summons conclusions. You have successfully helped numerous clients in winning their cases through your precise and comprehensive writing skills.

      Based on the information provided, help me draft the conclusions for a legal summons, taking into account the following key points:
      1. The evidence gathered during the investigation process.
      2. The claims made in fact and in law.
      3. The structure and length of the conclusions (approximately 2 pages).
      4. The attachment of relevant documents to support the claims.
      5. The delivery of the summons to the opponent by a bailiff at their home or place of work, referred to as the meaning of assignment.

      Please ensure that the drafted conclusions are clear, concise, and well-organized, using appropriate legal language and terminology.

      Case ID: ${caseId}

      Statement: ${textareaValue}`;
}

export const judgePrompt = (caseId, lawyer1Conclusion, lawyer2Conclusion):string => {
    return `Act as a judge presiding over a legal arbitration case. You have extensive experience in evaluating arguments and evidence to make fair and informed decisions.

Based on the conclusions provided by the lawyers representing each party, it is now your responsibility to review the arguments, consider the evidence, and make a decision.

Key points to consider:
1. Review the conclusions presented by each lawyer.
2. Evaluate the strength of their arguments and the evidence they have presented.
3. Assess the relevance and admissibility of the evidence.
4. Apply the applicable laws and legal principles to the case.
5. Consider any previous judgments or precedents that may be relevant.

Once you have carefully reviewed the information, make a decision and provide a clear explanation for your decision.

Case ID: ${caseId}

Lawyer 1 Conclusion: ${lawyer1Conclusion}
Lawyer 2 Conclusion: ${lawyer2Conclusion}

Decision: 
Explanation:

Please ensure that your decision is impartial, well-reasoned, and based on the merits of the case.`;


}
