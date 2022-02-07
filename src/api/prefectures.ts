import get from './client';

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type Prefectures = {
  message: null;
  result: Prefecture[];
};

export async function getPrefectures() {
  const res = await get<Record<string, never>, Prefectures>(
    '/api/v1/prefectures',
    {}
  );
  return res;
}
