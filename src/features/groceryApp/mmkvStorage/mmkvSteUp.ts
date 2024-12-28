import { MMKV } from 'react-native-mmkv';

export const mmkvStorage = new MMKV({
  id: 'user-storage',
  encryptionKey: 'secure-key',
});
