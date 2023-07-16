import AsyncStorage from '@react-native-async-storage/async-storage';

export type Key = 'AuthToken';

export const asyncStorageGetItem = async (key: Key): Promise<string | null> => {
  return await AsyncStorage.getItem(key);
};

export const asyncStorageSetItem = async (key: Key, value: string | null | undefined) => {
  if (value === null || value === undefined)
    await asyncStorageRemoveItem(key);
  else
    await AsyncStorage.setItem(key, value);
};

export const asyncStorageRemoveItem = async (key: Key) => {
  await AsyncStorage.removeItem(key);
};
