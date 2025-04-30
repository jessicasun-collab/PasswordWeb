import { encryptData, decryptData } from "./encryption";

// 加密儲存
export function savePasswords(arr, password) {
  const enc = encryptData(arr, password);
  localStorage.setItem("pm_data", enc);
}
// 解密讀取
export function loadPasswords(password) {
  const enc = localStorage.getItem("pm_data");
  if (!enc) return [];
  try {
    return decryptData(enc, password);
  } catch {
    return [];
  }
}
// 匯出（下載 JSON 檔）
export function exportPasswords(arr) {
  const blob = new Blob([JSON.stringify(arr, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "passwords.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}
// 匯入（載入 JSON 檔）
export async function importPasswords(file, password) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const arr = JSON.parse(reader.result);
        savePasswords(arr, password);
        resolve(arr);
      } catch {
        resolve([]);
      }
    };
    reader.readAsText(file);
  });
}