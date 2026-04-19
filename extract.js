/// This script is used for converting the proofs into the right form for the input of the verification case
const fs = require('fs');

function extractVectors(filePath) {
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(rawData);
    const { a, b, c } = json.proof;
    
    return [a, b, c];
  } catch (error) {
    console.error("Error processing the file:", error.message);
    return null;
  }
}

const result = extractVectors('./proof.json');

if (result) {
  console.log(JSON.stringify(result, null, 2));
}
