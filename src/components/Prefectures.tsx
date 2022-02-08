import React, { FC } from 'react';
import { Prefecture } from '../api/prefectures';
import usePrefectures from '../hooks/usePrefecture';
import '../css/Prefectures.css';

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
    <div className="prefectures-container">
      {prefectures?.result &&
        prefectures.result.map((prefecture) => (
          <div className="checkbox-wrapper" key={prefecture.prefCode}>
            <input
              type="checkbox"
              onClick={() => onClickCheckbox(prefecture)}
            />
            {prefecture.prefName}
          </div>
        ))}
    </div>
  );
};

export default Prefectures;
