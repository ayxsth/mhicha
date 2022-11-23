import http from '$/utils/http.util';
import { interpolate } from '$/utils/interpolate.util';

import endpoints from '$/config/endpoints.config';
import { BASE_URI } from '$/config/baseUri.config';

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export const create = async (body: User) => {
  const url = `${BASE_URI}${endpoints.users}`;

  const { data } = await http.post(url, { body, accessToken: false });

  return data;
};

export const findByEmail = async (email: string) => {
  const url = `${BASE_URI}${interpolate(endpoints.usersFindByEmail, { email })}`;

  const { data } = await http.get(url);

  return data;
};

export const login = async (body: LoginUser) => {
  const url = `${BASE_URI}${endpoints.login}`;

  const { data } = await http.post(url, { body, accessToken: false });

  return data;
};

export const me = async () => {
  const url = `${BASE_URI}${endpoints.me}`;

  const { data } = await http.get(url);

  return data;
};
