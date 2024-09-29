import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthStorage {
  getItem: <T>(key: string) => Promise<T | null>;
  setItem: <T>(key: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  clear: () => Promise<void>;
  updateItem: <T>(key: string, value: Partial<T>) => Promise<void>;
}

function useLocalStorage(): AuthStorage {
  const getItem = async <T>(key: string): Promise<T | null> => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(`Error retrieving item ${key}:`, e);
      return null;
    }
  };

  const setItem = async <T>(key: string, value: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting item ${key}:`, e);
    }
  };

  const removeItem = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing item ${key}:`, e);
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Error clearing storage:", e);
    }
  };

  const updateItem = async <T>(
    key: string,
    value: Partial<T>
  ): Promise<void> => {
    try {
      const currentValue = await getItem<T>(key);
      const newValue = currentValue ? { ...currentValue, ...value } : value;
      await setItem(key, newValue as T);
    } catch (e) {
      console.error(`Error updating item ${key}:`, e);
    }
  };

  return { getItem, setItem, removeItem, clear, updateItem };
}

export default useLocalStorage;
