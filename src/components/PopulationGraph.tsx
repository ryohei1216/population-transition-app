import React, { FC } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { Population } from '../hooks/usePopulation';

type Props = {
  populations: Population[];
};
const PopulationGraph: FC<Props> = ({ populations }) => {
  const array = [];
  for (let i = 0; i < populations[0]?.result.data[0].data.length; i += 1) {
    let populationData = {};
    populations.forEach((population) => {
      populationData = {
        ...populationData,
        [`${population.prefName}`]: population.result.data[0].data[i].value,
      };
    });
    populationData = {
      ...populationData,
      name: `${populations[0].result.data[0].data[i].year}`,
    };
    array.push(populationData);
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          height={250}
          data={array}
          margin={{ top: 5, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" domain={[1960, 2045]} padding={{ right: 20 }} />
          <YAxis />
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="top" />
          {populations.length > 0 &&
            populations.map((population) => (
              <Line
                key={`${population.prefCode}`}
                type="monotone"
                dataKey={`${population.prefName}`}
                // TODO:都道府県の文字列を16進数のcolorに変換
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
      <div className="label-yaxis">人口数</div>
      <div className="label-xaxis">年度</div>
    </div>
  );
};

export default PopulationGraph;
