import React from 'react';
import usePrefectures from '../hooks/usePrefecture';
import '../css/Prefectures.css';

const Prefectures = () => {
  const { prefectures } = usePrefectures();

  return (
    <div className="prefectures-container">
      {prefectures?.result &&
        prefectures.result.map((prefecture) => (
          <div className="checkbox-wrapper" key={prefecture.prefCode}>
            <input type="checkbox" />
            {prefecture.prefName}
          </div>
        ))}
    </div>
  );
};

export default Prefectures;
