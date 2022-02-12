import React, { FC, useEffect, useState } from 'react';
import '../css/PopulationTransition.css';
import Prefectures from '../components/Prefectures';
import PopulationGraph from '../components/PopulationGraph';
import { Prefecture } from '../api/prefectures';
import usePopulation from '../hooks/usePopulation';

const PopulationTransition: FC = () => {
  const [prefectureList, setPrefectureList] = useState<Prefecture[]>([]);
  const { selectedAllPopulations, fetchSelectedAllPopulations } =
    usePopulation();
  useEffect(() => {
    fetchSelectedAllPopulations(prefectureList).catch(() => {
      throw new Error('Failed fetch populations');
    });
    // eslint-disable-next-line
  }, [prefectureList]);
  return (
    <div className="container">
      <div>
        <h1>都道府県別の総人口推移グラフ</h1>
      </div>
      <div className="prefectures-container">
        <Prefectures setPrefectureList={setPrefectureList} />
      </div>
      <div className="population-graph-container">
        <PopulationGraph populations={selectedAllPopulations} />
      </div>
    </div>
  );
};

export default PopulationTransition;
