const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");

describe("ArbChainAi", function () {
  let arbChainAi;
  let owner;
  let secondPart;

  beforeEach(async function () {
    [owner, secondPart] = await ethers.getSigners();


    const ArbChainAi = await ethers.getContractFactory("ArbChainAi");

    arbChainAi = await ArbChainAi.deploy();

    await arbChainAi.deployed();

  });

  it("should create a case", async function () {
    const createCaseTx = await arbChainAi.createCase();

    // Wait for the transaction to be mined
    await createCaseTx.wait();

    const caseId = await arbChainAi.cases(createCaseTx.value.toString()).caseId();
    const caseCreator = await arbChainAi.cases(createCaseTx.value.toString()).caseCreator();

    expect(caseId).to.equal(createCaseTx.value.toString());
    expect(caseCreator).to.equal(owner.address);
  });

  it("should connect second part", async function () {
    const createCaseTx = await arbChainAi.createCase();
    await createCaseTx.wait();
    const caseId = createCaseTx.value.toString();

    const connectTx = await arbChainAi.secondPartConnect(caseId);

    // Wait for the transaction to be mined
    await connectTx.wait();

    const secondPartAddress = await arbChainAi.cases(caseId).secondPart();

    expect(secondPartAddress).to.equal(secondPart.address);
  });

  it("should update statement proof", async function () {
    const createCaseTx = await arbChainAi.createCase();
    await createCaseTx.wait();
    const caseId = createCaseTx.value.toString();

    const statementURI = "https://example.com/statement";
    const gptLawer = "John Doe";

    const updateProofTx = await arbChainAi.updateStatementProof(statementURI, gptLawer, caseId);

    // Wait for the transaction to be mined
    await updateProofTx.wait();

    const caseCreatorProof = await arbChainAi.caseCreatorsProofs(caseId);
    const secondPartProof = await arbChainAi.secondPartProofs(caseId);

    expect(caseCreatorProof.statementURI).to.equal(statementURI);
    expect(caseCreatorProof.gptLawer).to.equal(gptLawer);
    expect(secondPartProof.statementURI).to.equal(statementURI);
    expect(secondPartProof.gptLawer).to.equal(gptLawer);
  });

  it("should finalize judgement", async function () {
    const createCaseTx = await arbChainAi.createCase();
    await createCaseTx.wait();
    const caseId = createCaseTx.value.toString();

    await arbChainAi.secondPartConnect(caseId);
    await arbChainAi.updateStatementProof("https://example.com/statement", "John Doe", caseId);

    const finalJudgementUri = "https://example.com/judgement";
    const judgement = true;

    const finalizeJudgementTx = await arbChainAi.finalJudgement(caseId, judgement, finalJudgementUri);

    // Wait for the transaction to be mined
    await finalizeJudgementTx.wait();

    const isJudgementFinal = await arbChainAi.cases(caseId).isJudgementFinal();
    const caseCreatorWon = await arbChainAi.cases(caseId).caseCreatorWon();
    const finalJudgementUriStored = await arbChainAi.cases(caseId).finalJudgementUri();

    expect(isJudgementFinal).to.equal(true);
    expect(caseCreatorWon).to.equal(judgement);
    expect(finalJudgementUriStored).to.equal(finalJudgementUri);
  });
});
