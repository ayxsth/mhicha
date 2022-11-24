import { BASE_URI } from '$/config/baseUri.config';
import endpointsConfig from '$/config/endpoints.config';

import http from '$/utils/http.util';
import { interpolate } from '$/utils/interpolate.util';

export const fetch = async () => {
  const url = `${BASE_URI}${endpointsConfig.statement}`;

  const { data } = await http.get(url);

  return data;
};

export const fetchById = async (id: number) => {
  const url = `${BASE_URI}${interpolate(endpointsConfig.statementById, { id })}`;

  const { data } = await http.get(url);

  return data;
};
