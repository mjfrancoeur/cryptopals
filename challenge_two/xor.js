function App() {

  const HEX_RULER = '0123456789abcdef'.split('');

  function xorTwoHexStrings(hexStr1, hexStr2) {
    let bytesArr1 = hexStringToBytes(hexStr1);
    let bytesArr2 = hexStringToBytes(hexStr2);

    let xoredBytesArr = xor(bytesArr1, bytesArr2);

    return bytesArrToHexStr(xoredBytesArr);
  }

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
  // Takes two arrays of bytes and returns an array of their xor'd vals
  function xor(bytes1, bytes2) {
    return bytes1.map( (byte, i) => {
      return byte ^ bytes2[i];
    });
  }

  function bytesArrToHexStr(bytesArr) {
    let hex = [];

    for (let i = 0; i < bytesArr.length; i++) {
      hex.push(nibbleToHex(bytesArr[i] >> 4));
      hex.push(nibbleToHex(bytesArr[i] & 15));
    }
    return hex.join('');
  }

  function nibbleToHex(nib) {
    return HEX_RULER[nib];
  }

  console.log(xorTwoHexStrings('1c0111001f010100061a024b53535009181c', '686974207468652062756c6c277320657965') === '746865206b696420646f6e277420706c6179');
}

App();
