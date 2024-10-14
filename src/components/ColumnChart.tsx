// src/components/ColumnChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: any[];
}

const ColumnChart: React.FC<Props> = ({ data }) => {
  const countryData = data.reduce((acc, curr) => {
    acc[curr.country] = (acc[curr.country] || 0) + (curr.adults + curr.children + curr.babies);
    return acc;
  }, {});

  const series = [
    {
      name: 'Visitors',
      data: Object.values(countryData),
    },
  ];

  const options = {
    chart: { type: 'bar' },
    xaxis: { categories: Object.keys(countryData) },
    title: { text: 'Number of Visitors by Country' },
  };

  return <ReactApexChart options={options} series={series} type="bar" height={350} />;
};

export default ColumnChart;
