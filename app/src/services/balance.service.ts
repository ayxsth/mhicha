import http from '$/utils/http.util';

import { BASE_URI } from '$/config/baseUri.config';
import endpointsConfig from '$/config/endpoints.config';

interface SendBalance {
  email: string;
  amount: string;
  remark: string;
  type: string;
}

interface LoadBalance {
  amount: string;
  type: string;
}

export const send = async (body: SendBalance) => {
  const url = `${BASE_URI}${endpointsConfig.send}`;

  const { data } = await http.post(url, { body });

  return data;
};

export const load = async (body: LoadBalance) => {
  const url = `${BASE_URI}${endpointsConfig.load}`;

  const { data } = await http.post(url, { body });

  return data;
};
