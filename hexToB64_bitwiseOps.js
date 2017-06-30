// Constants used to index / convert to and from hex and base 64
const B64_RULER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const HEX_RULER = '0123456789abcdef';

// Convert hex string into a base-64 string
function hexToB64(hexStr) {

  // Convert hex string into an array of bytes
  let bytesArr = hexStringToBytes(hexStr);

  // Convert array of bytes into a b64 string
  let b64str = bytesArrToB64Str(bytesArr);

  return b64Str;
}

// Converts a hex string into an array of bytes (base 10)
function hexStringToBytes(hexStr) {

  let bytes = [];
  // Grab two hex digits at a time
  for (let i = 0; i < hexStr.length; i += 2) {
    bytes.push((hexStrToNum(hexStr[i]) << 4) + hexStrToNum(hexStr[i + 1]));
  }

  return bytes;
}

// Converts a hex string into a hex number (base 10)
function hexStrToNum(hexStr) {

  let hexNum = HEX_RULER.indexOf(hexStr);
  if (hexNum === -1) {
    throw new RangeError(`${hexStr} is not a hex digit`);
  }

  return hexNum;
}

function bytesArrToB64Str(bytesArr) {
  let hexStr = '';
  // Grab three bytes at a time
  for (let i = 0; i < bytesArr.length; i += 3) {
    hexStr += bytesToB64(bytesArr.slice(i, i + 3);
  }

  // Leftovers
  let leftoverBytes = bytesArr.slice(bytesArr.length  - (bytesArr.length % 3));
  // Padding
  let paddedLeftovers = padBytes(leftoverBytes, 3);

  return hexStr;
}

// Takes an array of three bytes and returns a string of b64 digits
function bytesToB64(bytesArr) {
  let hexStr = '';
  // Take the first 6 bits
  hexStr += b64_RULER[bytesArr[0] >> 2];
  // Take the second 6 bits
  hexStr += b64_RULER[(bytesArr[0] & 3) + (bytesArr[1] >> 4)];
  // Take the next set of 6 bits
  hexStr += b64_RULER[(bytesArr[1] & 15) + (bytesArr[2] >> 6)];
  // Take the final set of 6 bits
  hexStr += b64_RULER[bytesArr[2] & 63];

  return hexStr;
}

// Pad an array of bytes
function padBytes(arr, numBytes) {
  let missingBytes = numBytes - arr.length;
  return 
}

// function hexStringtoBinaryNumber(hexStr) {
//   // Convert hex string into a decimal string
//   let decStr = hexStrToDecimalStr(hexStr);
//   // Convert decimal string into a binary number and return
//   let binNum = decStrToBinaryNum(decStr);
// 
//   return binNum;
// }
// 
// Converts hex string (string) into a string of decimals (string)
// 
// // Converts string of decimal numbers (string) into a single binary number (number)
// function decStrToBinaryNum(decStr) {
// 
//   let bin = decStr.split('').reduce( (acc, curr) => {
//     acc = acc << 4;
//     return acc + decimalToBinary(Number(curr));
//   }, 0);
// }
// 
// // Converts a single decimal number (number) into a binary (number)
// function decimalToBinary(decNum) {  
//   let bin = 0;
// 
//   for (let i = 1; decNum; i *= 10) {
//     let remainder = decNum % 2;
//     decNum = Math.floor(decNum / 2);
//     bin += remainder * i;
//   }
// 
//   return bin;
// }
// 
// console.log(hexStringtoBinaryNumber('f'))
