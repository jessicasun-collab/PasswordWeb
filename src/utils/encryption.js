import CryptoJS from "crypto-js";

// 用 AES 加密
export function encryptData(data, password) {
  const str = JSON.stringify(data);
  return CryptoJS.AES.encrypt(str, password).toString();
}
// 用 AES 解密
export function decryptData(cipher, password) {
  const bytes = CryptoJS.AES.decrypt(cipher, password);
  const str = bytes.toString(CryptoJS.enc.Utf8);
  if (!str) throw new Error("Decryption failed");
  return JSON.parse(str);
}