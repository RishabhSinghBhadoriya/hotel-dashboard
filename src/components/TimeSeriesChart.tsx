import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

interface Props {
  data: any[];
  filteredData: any[];
  startDate: Date | null;
  endDate: Date | null;
}

const TimeSeriesChart: React.FC<Props> = ({ data, filteredData, startDate, endDate }) => {
  const processedData = useMemo(() => {
    return data.map(d => ({
      x: new Date(d.arrival_date_year, new Date(`${d.arrival_date_month} 1`).getMonth(), d.arrival_date_day_of_month),
      y: d.adults + d.children + d.babies
    })).sort((a, b) => a.x.getTime() - b.x.getTime());
  }, [data]);

  const processedFilteredData = useMemo(() => {
    return filteredData.map(d => ({
      x: new Date(d.arrival_date_year, new Date(`${d.arrival_date_month} 1`).getMonth(), d.arrival_date_day_of_month),
      y: d.adults + d.children + d.babies
    })).sort((a, b) => a.x.getTime() - b.x.getTime());
  }, [filteredData]);

  const projectedData = useMemo(() => {
    if (!startDate || !endDate || processedFilteredData.length === 0) return [];

    const totalVisitors = processedFilteredData.reduce((sum, d) => sum + d.y, 0);
    const averageVisitorsPerDay = totalVisitors / processedFilteredData.length;

    const projectionDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const projectedVisitors = Math.round(averageVisitorsPerDay * projectionDays);

    return [
      { x: startDate, y: processedFilteredData[0]?.y || null },
      { x: endDate, y: projectedVisitors }
    ];
  }, [processedFilteredData, startDate, endDate]);

  const series = [
    { name: 'Actual Visitors', data: processedData },
    { name: 'Filtered Visitors', data: processedFilteredData },
    { name: 'Projected Visitors', data: projectedData }
  ];

  const options = {
    chart: {
      type: 'line',
      zoom: { enabled: true },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Number of Visitors'
      }
    },
    title: {
      text: 'Number of Visitors per Day (Actual and Projected)',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    markers: {
      size: 0,
    },
    stroke: {
      curve: 'smooth',
      width: [2, 2, 2],
      dashArray: [0, 0, 5]
    },
  };

  return <ReactApexChart options={options} series={series} type="line" height={350} />;
};

export default TimeSeriesChart;