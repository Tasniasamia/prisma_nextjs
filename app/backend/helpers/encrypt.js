var CryptoJS = require("crypto-js");

export const encryptBuffer = (text) => {
  var ciphertext = CryptoJS.AES.encrypt(text, process?.env?.ENV_SECRET).toString();
  return ciphertext;
}
export const decryptBuffer = (ciphertext) => {
  var bytes  = CryptoJS.AES.decrypt(ciphertext, process?.env?.ENV_SECRET);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}
