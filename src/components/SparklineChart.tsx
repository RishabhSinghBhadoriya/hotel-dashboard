// src/components/SparklineChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  label: string;
  data: number[];
}

const SparklineChart: React.FC<Props> = ({ label, data }) => {
  const series = [{ data }];

  const options = {
    chart: { type: 'line', sparkline: { enabled: true } },
    stroke: { width: 2 },
    title: { text: `${label}`, align: 'center' },
  };

  return <ReactApexChart options={options} series={series} type="line" height={100} />;
};

export default SparklineChart;
