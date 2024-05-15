import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getValueFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return null;

    try {
      return JSON.parse(serializedData) as T;
    } catch {
      return serializedData as T;
    }
  } catch (error) {
    console.error("Error retrieving value from local storage:", error);

    return null;
  }
};

export const setValueToLocalStorage = (key: string, value: object | string): void => {
  try {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    throw new Error("Error setting data to local storage");
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    throw new Error("Error removing data from local storage");
  }
};
