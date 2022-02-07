import React, { FC } from 'react';
import '../css/PopulationTransition.css';
import Prefectures from '../components/Prefectures';
import usePrefecture from '../hooks/usePrefecture';

const PopulationTransition: FC = () => {
  return (
    <div className="container">
      <div>
        <h1>都道府県別の総人口推移グラフ</h1>
      </div>
      <div className="prefectures-container">
        <Prefectures />
      </div>
    </div>
  );
};

export default PopulationTransition;
