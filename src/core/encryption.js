const PBKDF2_ITER = 150000;
const SALT_SIZE = 16;
const NONCE_SIZE = 16;
const KEY_SIZE = 32;

// base64 encode/decode
export function base64Encode(u8) {
  return btoa(String.fromCharCode(...u8));
}
export function base64Decode(str) {
  return Uint8Array.from(atob(str), c => c.charCodeAt(0));
}

// 產生金鑰
async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: PBKDF2_ITER,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// 加密
export async function encryptData(plainText, password) {
  const salt = window.crypto.getRandomValues(new Uint8Array(SALT_SIZE));
  const nonce = window.crypto.getRandomValues(new Uint8Array(NONCE_SIZE));
  const key = await deriveKey(password, salt);
  const enc = new TextEncoder();
  const plainBytes = enc.encode(plainText);
  const cipherBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: nonce },
    key,
    plainBytes
  );
  const cipherArray = new Uint8Array(cipherBuffer);
  // 取出 tag（最後16 bytes）
  const tag = cipherArray.slice(cipherArray.length - 16);
  const ciphertext = cipherArray.slice(0, cipherArray.length - 16);
  // 儲存格式: salt + nonce + tag + ciphertext
  const out = new Uint8Array(salt.length + nonce.length + tag.length + ciphertext.length);
  out.set(salt, 0);
  out.set(nonce, SALT_SIZE);
  out.set(tag, SALT_SIZE + NONCE_SIZE);
  out.set(ciphertext, SALT_SIZE + NONCE_SIZE + 16);
  return base64Encode(out);
}

// 解密
export async function decryptData(enc, password) {
  const data = base64Decode(enc);
  const salt = data.slice(0, 16);
  const nonce = data.slice(16, 32);
  const tag = data.slice(32, 48);
  const ciphertext = data.slice(48);
  const key = await deriveKey(password, salt);
  // 合併 ciphertext + tag
  const ctWithTag = new Uint8Array(ciphertext.length + tag.length);
  ctWithTag.set(ciphertext, 0);
  ctWithTag.set(tag, ciphertext.length);
  try {
    const plainBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: nonce },
      key,
      ctWithTag
    );
    return new TextDecoder().decode(plainBuffer);
  } catch (e) {
    throw new Error("解密失敗：" + e.message);
  }
}