import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * Set a cookie.
 *
 * @param {string} key
 * @param {string|number} value
 */
export const set = (key: string, value: string | number) => {
  cookies.set(key, value, { path: '/' });
};

/**
 * Get a cookie.
 *
 * @param {string} key
 */
export const get = (key: string) => {
  return cookies.get(key);
};

/**
 * Remove a cookie.
 *
 * @param {string} key
 */
export const remove = (key: string) => {
  cookies.remove(key);
};
