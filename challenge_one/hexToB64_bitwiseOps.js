// Constants used to index / convert to and from hex and base 64
const B64_RULER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
const HEX_RULER = '0123456789abcdef'.split('');

// Convert hex string into a base-64 string
function hexToB64(hexStr) {

  // Convert hex string into an array of bytes
  let bytesArr = hexStringToBytes(hexStr);

  // Convert array of bytes into a b64 string
  let b64Str = bytesArrToB64Str(bytesArr);

  return b64Str;
}

// Converts a hex string into an array of bytes (base 10)
function hexStringToBytes(hexStr) {

  let bytes = [];
  // Grab two hex digits at a time
  for (let i = 0; i < hexStr.length - 1; i += 2) {
    bytes.push((hexStrToNum(hexStr[i]) << 4) + hexStrToNum(hexStr[i + 1]));
  }

  // if there is an odd number of hex chars, add the last char with padding
  if (hexStr.length % 2) {
    bytes.push(hexStrToNum(hexStr[hexStr.length - 1]) << 4);
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
    hexStr += bytesToB64(bytesArr.slice(i, i + 3));
  }

  return hexStr;
}

// Takes an array of three bytes and returns a string of b64 digits
function bytesToB64(bytesArr) {
  let hexStr = '';

  if (bytesArr.length === 3) {
    // Take the first 6 bits
    hexStr += B64_RULER[bytesArr[0] >> 2];
    // Take the second 6 bits
    hexStr += B64_RULER[(((bytesArr[0] & 3) << 4) + (bytesArr[1] >> 4))];
    // Take the next set of 6 bits
    hexStr += B64_RULER[(((bytesArr[1] & 15) << 2) + (bytesArr[2] >> 6))];
    // Take the final set of 6 bits
    hexStr += B64_RULER[bytesArr[2] & 63];
  } else {
    if (bytesArr.length === 1) {
      hexStr += B64_RULER[bytesArr[0] >> 2];
      hexStr += B64_RULER[(((bytesArr[0] & 3) << 4) + 0)];
    } else if (bytesArr.length === 2) {
      hexStr += B64_RULER[bytesArr[0] >> 2];
      hexStr += B64_RULER[(((bytesArr[0] & 3) << 4) + (bytesArr[1] >> 4))];
      hexStr += B64_RULER[(((bytesArr[1] & 15) << 2) + 0)];
    }
  }

  return hexStr;
}


console.log(hexToB64('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'));
