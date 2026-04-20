import crypto from "crypto";
import * as circomlibjs from "circomlibjs";

// Generation of the TIMESTAMPS
const current_timestamp = Math.floor(Date.now() / 1000); 
console.log("Current timestamp:");
console.log(current_timestamp);

// insert here the expiration timestamp in the format YYYY-MM-DD for converting it to the Unix format
const expire_timestamp = Math.floor(new Date('2030-08-10').getTime() / 1000)
console.log("Expiration timestamp:");
console.log(expire_timestamp);

// Credential ID
// Dummy ID of the identity card
const credential_id = 987654321;
console.log("\nCredential ID:");
console.log(credential_id);

// User secret generation
// Random generated 32byte number 
const randomBytes = crypto.randomBytes(32);
const user_secret = BigInt("0x" + randomBytes.toString("hex"));

console.log("User Secret (Save this locally):");
console.log(user_secret.toString());

// Hash Poseidon (expected attestation hash)
// Init of the library poseidon
const poseidon = await circomlibjs.buildPoseidon();

const inputs = [BigInt(credential_id), user_secret];
// Hash executed
const hashBytes = poseidon(inputs);
// Bytes conversion into field element like in the circuit ZoKrates
const expected_attestation_hash = poseidon.F.toString(hashBytes);

console.log("\nExpected Attestation Hash (The 'Signature'):");
console.log(expected_attestation_hash);

// Converts and exadecimal address into an integer
const myAddress = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";

const decimalAddress = BigInt(myAddress).toString(10);

console.log("Address in decimal format:");
console.log(decimalAddress);


const age_user = 25;

// Complete output
console.log("\n--- ZOKRATES COMMAND ---");
    console.log(`zokrates compute-witness -a ${age_user} ${credential_id} ${user_secret.toString()} ${current_timestamp} ${expire_timestamp} ${expected_attestation_hash} ${decimalAddress}`);







