import * as storage from './storage.util';

import { ACCESS_TOKEN } from '$/constants/token.constant';

export function getAccessToken(): string {
  return storage.get(ACCESS_TOKEN);
}

export function setAccessToken(accessToken: string) {
  storage.set(ACCESS_TOKEN, accessToken);
}

export function clear() {
  storage.remove(ACCESS_TOKEN);
}
