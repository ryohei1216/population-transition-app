import { useState, useEffect } from 'react';
import { Prefectures, getPrefectures } from '../api/prefectures';

const usePrefecture = () => {
  const [prefectures, setPrefectures] = useState<Prefectures>();
  const fetchPrefectures = async () => {
    const res = await getPrefectures();
    setPrefectures(res);
  };

  useEffect(() => {
    fetchPrefectures().catch((err) => {
      console.log(err);
      throw new Error('Failed fetch prefectures');
    });
  }, []);

  return { prefectures };
};

export default usePrefecture;
