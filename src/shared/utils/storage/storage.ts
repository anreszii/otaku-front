import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key: string): string | null {
  return storage.getString(key) || null;
}

/**
 * Loads a number from storage.
 *
 * @param key The key to fetch.
 */
export function loadNumber(key: string): number | null {
  return storage.getNumber(key) || null;
}

/**
 * Loads a boolean from storage.
 *
 * @param key The key to fetch.
 */
export function loadBoolean(key: string): boolean | null {
  return storage.getBoolean(key) || null;
}

/**
 * Saves a value to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveValue(key: string, value: string|number|boolean) {
  storage.set(key, value)
}

/**
 * Checking if a specific key exists
 *
 * @param key The key to fetch.
 */
export function contains(key: string): boolean {
  return storage.contains(key)
}

/**
 * Delete specific key or value
 *
 * @param key The key to delete.
 */
export function deleteKey(key: string) {
  return storage.delete(key)
}

/**
 * Clear all storage
 *
 */
export function clearStore() {
  return storage.clearAll()
}
