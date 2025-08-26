import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_ENCRYPT;

export const encryptData = (
  id: number,
  name: string,
  sessionCreation: number
): string => {
  const payload = {
    id,
    name,
    sessionCreation,
  };
  const cripto = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    secretKey
  ).toString();

  return cripto;
};

export const decryptData = (
  cripto: string
): { id: number; name: string; sessionCreation: number } => {
  try {
    const bytes = CryptoJS.AES.decrypt(cripto, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    localStorage.clear();
    window.location.href = "/";
    return null;
  }
};
