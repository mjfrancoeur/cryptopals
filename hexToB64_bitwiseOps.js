
const B64_RULER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const HEX_RULER = '0123456789abcdef';

// Convert hex string into a base-64 string
function hexToB64(hexStr) {
  // Convert hexadecimal to binary number
  let binNum = hexToBin(hex);
  // Convert binary to base 64 string
  let b64Str = binToB64(bin);

  return b64Str;
}


function hexStringtoBinaryNumber(hexStr) {
  // Convert hex string into a decimal string
  let decStr = hexStrToDecimalStr(hexStr);
  // Convert decimal string into a binary number and return
  let binNum = decStrToBinaryNum(decStr);

  return binNum;
}

// Converts hex string (string) into a string of decimals (string)
function hexStrToDecimalStr(hexStr) {

  return hexStr.split('').map( (el) => {
    let dec = HEX_RULER.indexOf(el.toLowerCase());
    if (dec === -1) {
      throw new RangeError(`${el} is not a hex digit`);
    }

    return dec;
  }).join('');

}

// Converts string of decimal numbers (string) into a single binary number (number)
function decStrToBinaryNum(decStr) {

  let bin = decStr.split('').reduce( (acc, curr) => {
    acc = acc << 4;
    return acc + decimalToBinary(Number(curr));
  }, 0);
}

// Converts a single decimal number (number) into a binary (number)
function decimalToBinary(decNum) {  
  let bin = 0;

  for (let i = 1; decNum; i *= 10) {
    let remainder = decNum % 2;
    decNum = Math.floor(decNum / 2);
    bin += remainder * i;
  }

  return bin;
}

console.log(hexStringtoBinaryNumber('f'))
