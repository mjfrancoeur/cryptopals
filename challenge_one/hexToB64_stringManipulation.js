// Arrays used to index/convert decimal to B64 and hexadecimal
const B64_RULER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
const HEX_RULER = '0123456789abcdef'.split('');

// Convert hex string into a base-64 string
function hexToB64(hex) {
  let bin = hexToBin(hex);
  let b64 = binToB64(bin);

  return b64;
}

// Convert hex string into a binary string
// Update function to take capitalized letters
function hexToBin(hexStr) {

  // Convert hex string to an array of decimal strings
  let decArr = hexStr.split('').map( (el) => {
    let dec = HEX_RULER.indexOf(el.toLowerCase());
    if (dec === -1) {
      throw new RangeError(`${el} is not a hex digit`);
    }

    return dec;
  });

  // Convert array of decimal strings into a binary string
  let binStr = decArr.map( (el) => {
    return toBinary(el);
  }).join('');

  return binStr;
}

// Converts decimal (string) to binary (string)
function toBinary(decStr) {
  let bin = 0;
  let decNum = Number(decStr);

  for (let i = 1; decNum; i *= 10) {
    let remainder = decNum % 2;
    decNum = Math.floor(decNum / 2);
    bin += remainder * i;
  }

  // Pad binary strings to have 4 chars
  return padBinString(bin.toString(), 4);

}

// Takes a binary string and converts it to a Base 64 string
function binToB64(binStr) {

  // Divide binary string into 6 bit chunks
  let arrOfBits = divideIntoBits(binStr, 6);
  // turn array of 6 bit binary strings into a Base 64 string
  return fromBinToB64(arrOfBits).join('');

}

// Converts an array of binary strings into an array of base 64 strings
function fromBinToB64(arrBin) {
  return arrBin.map( (bin) => {
    let dec = fromBinToDec(bin);
    return B64_RULER[dec];
  });
}

// Takes in a binary string and returns a decimal number
function fromBinToDec(binStr) {
  let bin = Number(binStr);
  let remainder = null;
  let result = 0;

  for (let i = 0; bin; i++ ) {
    remainder = bin % 10;
    bin = Math.floor(bin / 10);
    result += remainder * Math.pow(2, i);
  }
  return result;
}

// Divide a binary string into an array of binary strings numBits long
function divideIntoBits(str, numBits) {
  let bin = str.split('');
  let arrOfBits = [];

  while (bin.length) {
    let bits = bin.splice(0, numBits).join('');
    if (bits.length < numBits) {
      bits = padBinString(bits, numBits);
    }
    arrOfBits.push(bits);
  }

  return arrOfBits;
}

// Add padding to binary strings that need additional bits
function padBinString(binStr, num) {

  while (binStr.length < num) {
    binStr = '0' + binStr;
  }

  return binStr;
}

// test
console.log(hexToB64('g'));
// console.log(hexToB64('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d') === 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t');
