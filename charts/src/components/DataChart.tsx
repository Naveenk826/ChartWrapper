import React, { useEffect, useRef } from "react";
import { initializeChart, ChartType } from "../utils/initializeChart";

// Define the props for the DataChart component
type DataChartProps = {
  chartType: ChartType; // The type of chart to render (e.g., line, bar, pie)
  data: any; // The data to be displayed in the chart
  combinationSeries?: {
    type: ChartType; // The type of chart for this series (e.g., line, bar)
    yKey: string; // The key for the Y-axis data
    name: string; // The name of the series (used in legends)
  }[];
};

const DataChart: React.FC<DataChartProps> = ({
  chartType,
  data,
  combinationSeries,
}) => {
  // Ref for the chart container div
  const chartDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the chart when the component mounts or when dependencies change
    if (chartDivRef.current) {
      initializeChart(chartType, data, chartDivRef.current, combinationSeries);
    }

    // Cleanup function to clear the chart container when the component unmounts
    return () => {
      if (chartDivRef.current) {
        chartDivRef.current.innerHTML = ""; // Clear the chart container
      }
    };
  }, [chartType, data, combinationSeries]); // Dependencies: re-run effect when these change

  // Render the chart container
  return <div ref={chartDivRef} style={{ width: "100%", height: "100%" }} />;
};

export default DataChart;