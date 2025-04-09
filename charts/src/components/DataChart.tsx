import React, { useEffect, useState } from "react";
import { AgCharts } from 'ag-charts-react';
import { ChartTypes } from "../constants/enum";

interface ChartData {
  x: string[];
  y?: number[];
  size?: number[];
  [key: string]: any;
}

interface CombinationSeries {
  type: ChartTypes;
  yKey: string;
  name: string;
}

interface DataChartProps {
  chartType: ChartTypes | "combination";
  data: ChartData;
  combinationSeries?: CombinationSeries[];
}

const DataChart: React.FC<DataChartProps> = ({ chartType, data, combinationSeries }) => {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    initializeChart();
  }, [chartType, data, combinationSeries]);

  const initializeChart = () => {
    const formattedData = data.x.map((xValue, index) => {
      const formattedPoint: any = { xKey: xValue };
      if (data.y) formattedPoint.yKey = data.y[index];
      if (data.size) formattedPoint.size = data.size[index];
      Object.keys(data).forEach((key) => {
        if (key !== "x" && key !== "y" && key !== "size") {
          formattedPoint[key] = data[key][index];
        }
      });
      return formattedPoint;
    });

    const options = {
      title: { text: `AG Charts - ${chartType} Chart`, fontSize: 18 },
      data: formattedData,
      series:
        chartType === "combination" && combinationSeries
          ? combinationSeries.map((series) => ({
              type: series.type,
              xKey: "xKey",
              yKey: series.yKey,
              name: series.name,
            }))
          : chartType === ChartTypes.Pie || chartType === ChartTypes.Donut
          ? [
              {
                type: chartType === ChartTypes.Donut ? 'donut' : "pie",
                angleKey: "yKey",
                labelKey: "xKey",
                innerRadiusRatio: chartType === ChartTypes.Donut ? 0.7 : 0,
              },
            ]
          : chartType === ChartTypes.Bubble
          ? [
              {
                type: "bubble",
                xKey: "xKey",
                yKey: "yKey",
                sizeKey: "size",
              },
            ]
          : [{ type: chartType, xKey: "xKey", yKey: "yKey" }],
      legend: { enabled: true },
      axes:
        chartType === ChartTypes.Pie || chartType === ChartTypes.Donut
          ? []
          : [
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