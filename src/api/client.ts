type EmptyObject = Record<string, never>;
const PATH_PREFIX = 'https://opendata.resas-portal.go.jp';

export default async function get<
  Query extends { [key: string]: string } = EmptyObject,
  Response = EmptyObject
>(path: string, query: Query): Promise<Response> {
  const url = new URL(PATH_PREFIX + path);
  Object.entries({
    ...query,
  })
    .filter(([key, value]) => value !== undefined)
    .forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-API-KEY': 'CX1V0FJ7UDeE2vnwCGDuFMexbADUAYuGAfIEnTlj',
    },
  });
  console.log(res);

  // eslint-disable-next-line
  return await res.json();
}
