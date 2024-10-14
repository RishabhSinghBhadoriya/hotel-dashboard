import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

interface Props {
  data: any[];
  filteredData: any[];
  startDate: Date | null;
  endDate: Date | null;
}

const TimeSeriesChart: React.FC<Props> = ({
  data,
  filteredData,
  startDate,
  endDate,
}) => {
  const processedData = useMemo(() => {
    return data
      .map((d) => ({
        x: new Date(
          d.arrival_date_year,
          new Date(`${d.arrival_date_month} 1`).getMonth(),
          d.arrival_date_day_of_month
        ).getTime(),
        y: d.adults + d.children + d.babies,
      }))
      .sort((a, b) => a.x - b.x);
  }, [data]);

  const processedFilteredData = useMemo(() => {
    return filteredData
      .map((d) => ({
        x: new Date(
          d.arrival_date_year,
          new Date(`${d.arrival_date_month} 1`).getMonth(),
          d.arrival_date_day_of_month
        ).getTime(),
        y: d.adults + d.children + d.babies,
      }))
      .sort((a, b) => a.x - b.x);
  }, [filteredData]);

  const series = [
    { name: "Actual Visitors", data: processedData },
    { name: "Filtered Visitors", data: processedFilteredData },
  ];

  const options = {
    chart: {
      type: "line" as const,
      zoom: { enabled: true },
    },
    xaxis: {
      type: "datetime" as const,
    },
    yaxis: {
      title: {
        text: "Number of Visitors",
      },
    },
    title: {
      text: "Number of Visitors per Day",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    markers: {
      size: 0,
    },
    stroke: {
      curve: "smooth" as const,
      width: [2, 2],
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};

export default TimeSeriesChart;
