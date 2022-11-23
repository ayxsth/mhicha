import { BASE_URI } from '$/config/baseUri.config';
import endpointsConfig from '$/config/endpoints.config';

import http from '$/utils/http.util';
import { interpolate } from '$/utils/interpolate.util';

export const fetch = async (amount: number) => {
  const url = `${BASE_URI}${interpolate(endpointsConfig.charge, { amount })}`;

  const { data } = await http.get(url);

  return data;
};
