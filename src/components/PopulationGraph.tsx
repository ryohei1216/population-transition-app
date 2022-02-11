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

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
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
  console.log(array);

  const hexStr = '秋田県'
    .split('')
    .map((v) => v.charCodeAt(0).toString(16))
    .join(' ');
  console.log(hexStr);

  return (
    <ResponsiveContainer width="90%" height={500}>
      <LineChart
        width={730}
        height={250}
        data={array}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {populations.length > 0 &&
          populations.map((population) => (
            <Line
              type="monotone"
              dataKey={`${population.prefName}`}
              // TODO:都道府県の文字列を16進数のcolorに変換
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PopulationGraph;
