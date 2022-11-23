import axios, { ResponseType } from 'axios';

import { getAccessToken } from './token.util';

import { BASE_URI } from '$/config/baseUri.config';

const instance = axios.create({
  baseURL: BASE_URI,
  headers: {
    'Content-Type': 'application/json'
  }
});

const post = async (url: string, { params = {}, body = {}, accessToken = true, headers = {} } = {}) => {
  const authHeaders: { Authorization?: string } = {};

  if (accessToken) {
    authHeaders.Authorization = `Bearer ${getAccessToken()}`;
  }

  return instance({
    url,
    params,
    data: body,
    method: 'post',
    headers: { ...authHeaders, ...headers }
  })
    .then((response) => response)
    .catch((error) => {
      throw error?.response?.data || error;
    });
};

const put = async (url: string, { params = {}, body = {}, accessToken = true, headers = {} } = {}) => {
  const authHeaders: { Authorization?: string } = {};

  if (accessToken) {
    authHeaders.Authorization = `Bearer ${getAccessToken()}`;
  }

  return instance({
    url,
    params,
    data: body,
    method: 'put',
    headers: { ...authHeaders, ...headers }
  })
    .then((response) => response)
    .catch((error) => {
      throw error?.response?.data || error;
    });
};

const get = async (
  url: string,
  { params = {}, accessToken = true, headers = {}, responseType = 'json' as ResponseType } = {}
) => {
  const authHeaders: { Authorization?: string } = {};

  if (accessToken) {
    authHeaders.Authorization = `Bearer ${getAccessToken()}`;
  }

  return instance({
    url,
    params,
    method: 'get',
    headers: { ...authHeaders, ...headers },
    responseType
  })
    .then((response) => response)
    .catch((error) => {
      throw error?.response?.data || error;
    });
};

const del = async (url: string, { params = {}, accessToken = true, headers = {} } = {}) => {
  const authHeaders: { Authorization?: string } = {};

  if (accessToken) {
    authHeaders.Authorization = `Bearer ${getAccessToken()}`;
  }

  return instance({
    url,
    params,
    method: 'delete',
    headers: { ...authHeaders, ...headers }
  })
    .then((response) => response)
    .catch((error) => {
      throw error?.response?.data || error;
    });
};

const http = {
  post,
  put,
  get,
  del
};

export default http;
