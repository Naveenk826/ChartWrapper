import React, { useEffect, useState } from "react";
import { AgCharts } from 'ag-charts-react';
import { ChartTypes } from "../constants/enum";

interface ChartData {
  x: string[];
  y: number[];
}

interface DataChartProps {
  chartType: ChartTypes;
  data: ChartData;
}

const DataChart: React.FC<DataChartProps> = ({ chartType, data }) => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    initializeChart();
  }, [chartType, data]);

  const initializeChart = () => {
    const formattedData = data.x.map((xValue, index) => ({
      xKey: xValue,
      yKey: data.y[index],
    }));

    const options = {
      title: { text: `AG Charts - ${chartType} Chart`, fontSize: 18 },
      data: formattedData,
      series:
        chartType === ChartTypes.Pie
          ? [{ type: "pie", angleKey: "yKey", labelKey: "xKey" }]
          : [{ type: chartType, xKey: "xKey", yKey: "yKey" }],
      legend: { enabled: true },
      axes: chartType === ChartTypes.Pie ? [] : [
        { type: "category", position: "bottom" },
        { type: "number", position: "left" },
      ],
    };

    setChartOptions(options);
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <AgCharts options={chartOptions} />
    </div>
  );
};

export default DataChart;
