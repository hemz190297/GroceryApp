import { STORAGE_KEYS } from './keys';
import { mmkvStorage } from './mmkvSteUp';

export const saveLoginDetails = (token: string) => {
  mmkvStorage.set(STORAGE_KEYS.USER_TOKEN, token);
  mmkvStorage.set(STORAGE_KEYS.IS_LOGGED_IN, true);
};

export const clearLoginDetails = () => {
  mmkvStorage.delete(STORAGE_KEYS.USER_TOKEN);
  mmkvStorage.set(STORAGE_KEYS.IS_LOGGED_IN, false);
};

export const isLoggedIn = (): boolean => {
  return mmkvStorage.getBoolean(STORAGE_KEYS.IS_LOGGED_IN) || false;
};
