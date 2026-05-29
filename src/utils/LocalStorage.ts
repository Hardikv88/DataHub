import CryptoJS from "crypto-js";
import type { LoginResponseModel } from "../modals/LoginResponseModel";

const USER_DATA_KEY = "userData";
const ACCESS_TOKEN_KEY = "accessToken";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; // move to .env in real app

export const getUser = (): LoginResponseModel | null => {
  const data = localStorage.getItem(USER_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

export const setUser = (user: LoginResponseModel) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(USER_DATA_KEY);
};


// Encrypt & Save
export const setToken = (value: string) => {
  const stringValue = JSON.stringify(value);
  const encrypted = CryptoJS.AES.encrypt(stringValue, SECRET_KEY).toString();
  localStorage.setItem(ACCESS_TOKEN_KEY, encrypted);
};

// Decrypt & Get
export const getToken = <T>(): T | null => {
  const encrypted = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted) as T;
  } catch (error) {
    console.error("Decryption error", error);
    return null;
  }
};

// Remove
export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};