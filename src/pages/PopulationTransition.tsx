import React, { FC, useState } from 'react';
import '../css/PopulationTransition.css';
import Prefectures from '../components/Prefectures';
import { Prefecture } from '../api/prefectures';

const PopulationTransition: FC = () => {
  const [prefectureList, setPrefectureList] = useState<Prefecture[]>([]);
  console.log(prefectureList);
  return (
    <div className="container">
      <div>
        <h1>都道府県別の総人口推移グラフ</h1>
      </div>
      <div className="prefectures-container">
        <Prefectures setPrefectureList={setPrefectureList} />
      </div>
    </div>
  );
};

export default PopulationTransition;
