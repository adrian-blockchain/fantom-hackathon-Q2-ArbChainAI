// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/Strings.sol";

contract ArbChainAi {
  struct ArbCase {
    address caseCreator;
    address secondPart;
    string caseId;
    bool isJudgementFinal;
    bool caseCreatorProofSubmitted;
    bool secondPartProofSubmitted;
    bool caseCreatorWon;
    string finalJudgementUri;
  }

  struct StatementProof {
    string statementURI;
    string gptLawer;
    uint256 time;
  }

  mapping(string => ArbCase) public cases;
  mapping(string => StatementProof) public caseCreatorsProofs;
  mapping(string => StatementProof) public secondPartProofs;

  event CaseCreated(string caseId, address creator);
  event SecondPartConnected(string caseId, address secondPart);
  event StatementProofUpdated(string caseId, address by);
  event JudgementFinalized(string caseId, bool caseCreatorWon);
  event CaseDataDisplayed(
    string caseId,
    address caseCreator,
    address secondPart,
    bool isJudgementFinal,
    bool caseCreatorProofSubmitted,
    bool secondPartProofSubmitted,
    bool caseCreatorWon,
    string finalJudgementUri
  );

  function createCase() public returns (string memory) {
    string memory caseId = generateCaseId();

    ArbCase memory newCase = ArbCase({
    caseCreator: msg.sender,
    secondPart: address(0),
    caseId: caseId,
    isJudgementFinal: false,
    caseCreatorProofSubmitted: false,
    secondPartProofSubmitted: false,
    caseCreatorWon: false,
    finalJudgementUri: ""
    });

    cases[caseId] = newCase;

    emit CaseCreated(caseId, msg.sender);

    return caseId;
  }

  function secondPartConnect(string memory _caseId) public {
    require(cases[_caseId].caseCreator != address(0), "Case does not exist");
    require(cases[_caseId].secondPart == address(0), "Second part already connected");
    require(cases[_caseId].caseCreator != msg.sender, "Second part cannot be the case creator");

    cases[_caseId].secondPart = msg.sender;

    emit SecondPartConnected(_caseId, msg.sender);
  }

  function updateStatementProof(
    string memory _statementURI,
    string memory _gptLawer,
    string memory _caseId
  ) public {
    require(cases[_caseId].caseCreator != address(0), "Case does not exist");
    require(
      cases[_caseId].caseCreator == msg.sender || cases[_caseId].secondPart == msg.sender,
      "Unauthorized"
    );

    StatementProof memory proof = StatementProof(_statementURI, _gptLawer, block.timestamp);

    if (cases[_caseId].caseCreator == msg.sender) {
      require(!cases[_caseId].caseCreatorProofSubmitted, "Proof has already been submitted");
      caseCreatorsProofs[_caseId] = proof;
      cases[_caseId].caseCreatorProofSubmitted = true;
    } else {
      require(!cases[_caseId].secondPartProofSubmitted, "Proof has already been submitted");
      secondPartProofs[_caseId] = proof;
      cases[_caseId].secondPartProofSubmitted = true;
    }

    emit StatementProofUpdated(_caseId, msg.sender);
  }

  function finalJudgement(
    string memory _caseId,
    bool _judgement,
    string memory _finalJudgementUri
  ) public {
    require(cases[_caseId].caseCreator != address(0), "Case does not exist");
    require(
      cases[_caseId].caseCreator == msg.sender || cases[_caseId].secondPart == msg.sender,
      "Unauthorized"
    );
    require(!cases[_caseId].isJudgementFinal, "Judgement has already been finalized");
    require(
      cases[_caseId].caseCreatorProofSubmitted && cases[_caseId].secondPartProofSubmitted,
      "Both parties have not submitted proof"
    );

    cases[_caseId].finalJudgementUri = _finalJudgementUri;
    cases[_caseId].caseCreatorWon = _judgement;
    cases[_caseId].isJudgementFinal = true;

    emit JudgementFinalized(_caseId, _judgement);
  }

  function getCase(string memory _caseId)
  public
  view
  returns (
    address caseCreator,
    address secondPart,
    bool isJudgementFinal,
    bool caseCreatorProofSubmitted,
    bool secondPartProofSubmitted,
    bool caseCreatorWon,
    string memory finalJudgementUri
  )
  {
    require(cases[_caseId].caseCreator != address(0), "Case does not exist");

    ArbCase storage arbCase = cases[_caseId];

    return (
    arbCase.caseCreator,
    arbCase.secondPart,
    arbCase.isJudgementFinal,
    arbCase.caseCreatorProofSubmitted,
    arbCase.secondPartProofSubmitted,
    arbCase.caseCreatorWon,
    arbCase.finalJudgementUri
    );
  }

  function generateCaseId() internal view returns (string memory) {
    return
    string(
      abi.encodePacked(
        Strings.toString(block.timestamp),
        Strings.toHexString(uint160(msg.sender))
      )
    );
  }

  function displayCaseData(string memory _caseId) public {
    require(cases[_caseId].caseCreator != address(0), "Case does not exist");

    ArbCase storage arbCase = cases[_caseId];

    emit CaseDataDisplayed(
      _caseId,
      arbCase.caseCreator,
      arbCase.secondPart,
      arbCase.isJudgementFinal,
      arbCase.caseCreatorProofSubmitted,
      arbCase.secondPartProofSubmitted,
      arbCase.caseCreatorWon,
      arbCase.finalJudgementUri
    );
  }
}
