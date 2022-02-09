type EmptyObject = Record<string, never>;
// TODO：エンドポイントを環境変数へ
const PATH_PREFIX = 'https://opendata.resas-portal.go.jp';

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
      // TODO:API-KEYを環境変数へ
      'X-API-KEY': 'CX1V0FJ7UDeE2vnwCGDuFMexbADUAYuGAfIEnTlj',
    },
  });

  // eslint-disable-next-line
  return await res.json();
}
