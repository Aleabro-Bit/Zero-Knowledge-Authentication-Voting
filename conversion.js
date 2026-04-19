// Converts and exadecimal address into an integer
const myAddress = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";

const decimalAddress = BigInt(myAddress).toString(10);

console.log("Address in decimal format:");
console.log(decimalAddress);