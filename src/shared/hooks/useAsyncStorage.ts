import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ReturnValue<T> {
  storedValue: T | null;
  setValue: (value: T) => Promise<void>;
  removeValue: () => Promise<void>;
  loading: boolean;
}

const useAsyncStorage = <T>(key: string): ReturnValue<T> => {
  const [storedValue, setStoredValue] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null) {
          setStoredValue(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.error("AsyncStorage error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredValue();
  }, [key]);

  const setValue = async (value: T) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setStoredValue(value);
    } catch (error) {
      console.error("AsyncStorage error:", error);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error("AsyncStorage error:", error);
    }
  };

  return { storedValue, setValue, removeValue, loading };
};

export default useAsyncStorage;
