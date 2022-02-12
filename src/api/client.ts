type EmptyObject = Record<string, never>;
const PATH_PREFIX = process.env.REACT_APP_API_DOMAIN || '';
const API_KEY = process.env.REACT_APP_API_KEY || '';

export default async function get<
  Query extends { [key: string]: string | number } = EmptyObject,
  Response = EmptyObject
>(path: string, query: Query): Promise<Response> {
  const url = new URL(PATH_PREFIX + path);
  Object.entries({
    ...query,
  })
    .filter(([key, value]) => value !== undefined)
    .forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-API-KEY': `${API_KEY}`,
    },
  });

  // eslint-disable-next-line
  return await res.json();
}
