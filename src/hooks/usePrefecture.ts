import { useState, useEffect } from 'react';
import { Prefectures, getPrefectures } from '../api/prefectures';

const usePrefecture = () => {
  const [prefectures, setPrefectures] = useState<Prefectures>();
  const fetchPrefectures = async () => {
    const res = await getPrefectures();
    console.log(res);
    setPrefectures(res);
  };

  useEffect(() => {
    fetchPrefectures().catch((err) => {
      console.error(err);
    });
  }, []);

  return { prefectures };
};

export default usePrefecture;
