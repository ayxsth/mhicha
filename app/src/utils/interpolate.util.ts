/**
 * Build supplied string by interpolating properties after delimiter(':') with the given parameters.
 *
 * @example
 * interpolate('/posts/:id', {id: 1})
 * => '/posts/1'
 *
 */
export const interpolate = (str: string, params: { [key: string]: string | number }): string => {
  let url = str;
  Object.keys(params).forEach((key) => {
    url = url.replaceAll(`:${key}`, `${params[key]}`);
  });

  return url;
};

/**
 * get required parameters from string as given by  delimiter(':').
 *
 * @example
 * unInterpolate('/posts/:id','/posts/1')
 * => {id: 1}
 *
 */
export const unInterpolate = (route: string, url: string) => {
  const stencil = route.replaceAll(/:(.*?)(?:\/|$)/g, '(?<$1>.*?)(?:/|$)');
  const pattern = new RegExp(stencil);
  const matches = url.match(pattern);
  return matches?.groups;
};

/**
 *
 * @example
 * unInterpolate('{{1000}}')
 * => 1000
 *
 */
export function middleChar(text: string) {
  return text.substring(text.indexOf('{{') + 2, text.lastIndexOf('}}'));
}
