import React, { FC, useState } from 'react';
import { Prefecture } from '../api/prefectures';
import usePrefectures from '../hooks/usePrefecture';

type Props = {
  setPrefectureList: React.Dispatch<React.SetStateAction<Prefecture[]>>;
};
const Prefectures: FC<Props> = ({ setPrefectureList }) => {
  const { prefectures } = usePrefectures();

  const onClickCheckbox = (prefecture: Prefecture) => {
    setPrefectureList((preList) => {
      if (preList.some((el) => el.prefCode === prefecture.prefCode)) {
        const newArray = preList.filter(
          (el) => el.prefCode !== prefecture.prefCode
        );
        return newArray;
      }

      return [...preList, prefecture];
    });
  };
  return (
    <div>
      <h3>都道府県</h3>
      <div className="prefectures-wrapper">
        <div className="prefectures-group">
          {prefectures?.result &&
            prefectures.result.map((prefecture) => (
              <div className="checkbox-wrapper" key={prefecture.prefCode}>
                <input
                  data-testid={prefecture.prefName}
                  type="checkbox"
                  onClick={() => onClickCheckbox(prefecture)}
                />
                {prefecture.prefName}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Prefectures;
