
// Convert hex string into a binary string
function hexToBin(hexStr) {
  let bin = '';
  let hexConverter = '0123456789abcdef'.split('');

  // Convert hex string to an array of decimal strings
  let decArr = hexStr.split('').map( (el) => {
    return hexConverter.indexOf(el);
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

  let arrOfDecs = fromBinToB64(arrOfBits);
}

// Converts an array of binary strings into an array of decimals
function fromBinToB64(arrBin) {
  let ruler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01223456789+/'.split('');
  return arrBin.map( (bin) {
    let dec = fromBinToDec(bin);
    return ruler[dec];
  });
}

// Takes in a binary string and returns a decimal number
function fromBinToDec(binStr) {
  
}

function divideIntoBits(str, numBits) {
  let bin = str.split('');
  let arrOfBits = [];

  while (bin) {
    let bits = bin.splice(0, numBits).join('');
    if (bits.length < numBits) {
      bits = padBinString(bits, numBits);
    }
    arrOfBits.push(bits);
  }

  return arrOfBits;
}

function padBinString(binStr, num) {

  while (binStr.length < num) {
    binStr = '0' + binStr;
  }

  return binStr;
