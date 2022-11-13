import http from '$/utils/http.util';

import endpoints from '$/config/endpoints.config';
import { BASE_URI } from '$/config/baseUri.config';

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
}

export const create = async (body: User) => {
  const url = `${BASE_URI}${endpoints.users}`;

  const { data } = await http.post(url, { body, accessToken: false });

  return data;
};
