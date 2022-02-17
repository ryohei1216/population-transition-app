import { useState, useCallback } from 'react';
import { TotalPopulation, getPopulation } from '../api/population';
import { Prefecture } from '../api/prefectures';

export type Population = TotalPopulation & Prefecture;

const usePopulation = () => {
  const [selectedAllPopulations, setSelectedAllPopulations] = useState<
    Population[]
  >([]);

  /**
   * @param {object} prefecture  - 人口構成を取得したい都道府県
   * @param {string} cityCode - 人口構成を取得したい都道府県の市区町村
   */
  const fetchPopulation = useCallback(
    async (prefecture: Prefecture, cityCode: string): Promise<Population> => {
      const res = await getPopulation({
        prefCode: prefecture.prefCode,
        cityCode,
      });
      return {
        ...res,
        prefCode: prefecture.prefCode,
        prefName: prefecture.prefName,
      };
    },
    []
  );

  /**
   * @param {Array} prefectureList - 総人口構成を取得したい都道府県の配列
   */
  const fetchSelectedAllPopulations = useCallback(
    async (prefectureList: Prefecture[]) => {
      await Promise.all(
        prefectureList.map((prefecture) => fetchPopulation(prefecture, '-'))
      ).then((result) => {
        setSelectedAllPopulations(result);
      });
    },
    [fetchPopulation]
  );

  return { selectedAllPopulations, fetchSelectedAllPopulations };
};

export default usePopulation;
