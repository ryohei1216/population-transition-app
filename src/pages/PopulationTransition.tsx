import React, { FC } from 'react';
import '../css/PopulationTransition.css';
import usePrefecture from '../hooks/usePrefecture';

const PopulationTransition: FC = () => {
  const { prefectures } = usePrefecture();
  console.log(prefectures);
  return (
    <div className="container">
      <div>
        <h1>都道府県別の総人口推移グラフ</h1>
      </div>
    </div>
  );
};

export default PopulationTransition;
