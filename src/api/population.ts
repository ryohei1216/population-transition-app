import get from './client';

export type PerPopulation = {
  label: string;
  data: {
    year: number;
    value: number;
  }[];
};
export type TotalPopulation = {
  message: null;
  result: {
    boundaryYear: number;
    data: PerPopulation[];
  };
};

export type Query = {
  prefCode: number;
  cityCode: string;
};
export async function getPopulation(query: Query): Promise<TotalPopulation> {
  const res = await get<Query, TotalPopulation>(
    '/api/v1/population/composition/perYear',
    {
      prefCode: query.prefCode,
      cityCode: query.cityCode,
    }
  );
  return res;
}
