import React, { useEffect, useRef } from "react";
import { initializeChart, ChartType } from "../utils/initializeChart";

type DataChartProps = {
  chartType: ChartType;
  data: any;
  // title: string;
  combinationSeries?: {
    type: ChartType;
    yKey: string;
    name: string;
  }[];
};

const DataChart: React.FC<DataChartProps> = ({
  chartType,
  data,
  combinationSeries,
}) => {
  const chartDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartDivRef.current) {
      initializeChart(chartType, data, chartDivRef.current, combinationSeries);
    }

    return () => {
      if (chartDivRef.current) {
        chartDivRef.current.innerHTML = "";
      }
    };
  }, [chartType, data, combinationSeries]);

  return <div ref={chartDivRef} style={{ width: "100%", height: 400 }} />;
};

export default DataChart;
