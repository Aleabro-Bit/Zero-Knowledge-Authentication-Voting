/// This script is used for converting the proofs into the right form for the input of the verification case
const fs = require('fs');

function extractForSmartContract(filePath) {
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(rawData);
    
    const { a, b, c } = json.proof;
    
    const proofTuple = {
      a: [a[0], a[1]],
      b: [
        [b[0][0], b[0][1]],
        [b[1][0], b[1][1]]
      ],
      c: [c[0], c[1]]
    };

    const inputs = json.inputs;

    return {
      proof: proofTuple,
      inputs: inputs
    };
    
  } catch (error) {
    console.error("Error :", error.message);
    return null;
  }
}

const result = extractForSmartContract('./proof.json');

if (result) {
  console.log("--- ARGUMENTS FOR VERIFY_TX ---\n");
  
  console.log("Proof:");
  const ethersProofArray = [
      result.proof.a,
      result.proof.b,
      result.proof.c
  ];
  console.log(JSON.stringify(ethersProofArray, null, 2));
  
  console.log("\n-------------------------------\n");

  console.log("Input:");
  console.log(JSON.stringify(result.inputs, null, 2));
  
  console.log("\n-------------------------------\n");
}
