import {
    AgCartesianChartOptions,
    AgPolarChartOptions,
    AgChartOptions,
    AgCharts,
  } from "ag-charts-community";
  
  export type ChartType =
    | "line"
    | "area"
    | "bar"
    | "scatter"
    | "bubble"
    | "pie"
    | "donut"
    | "combination";
  
  type CombinationSeries = {
    type: ChartType;
    yKey: string;
    name: string;
  };
  
  export const initializeChart = (
    chartType: ChartType,
    data: any,
    container: HTMLDivElement,
    combinationSeries?: CombinationSeries[]
  ): void => {
    let options: AgChartOptions;
  
    const commonTitle = {
      text: chartType,
      fontSize: 18,
    };
  
    if (chartType === "pie" || chartType === "donut") {
      const pieData = data.x.map((label: string, index: number) => ({
        category: label,
        value: data.y[index],
      }));
  
      options = {
        container,
        title: commonTitle,
        data: pieData,
        series: [
          {
            type: chartType === "pie" ? "pie" : "donut",
            angleKey: "value",
            calloutLabelKey: "category",
            innerRadiusRatio: chartType === "donut" ? 0.6 : 0,
          },
        ],
        legend: {
          enabled: true,
          position: "bottom",
        },
      } as AgPolarChartOptions;
    } else if (chartType === "combination" && combinationSeries) {
      const comboData = data.x.map((xVal: any, index: number) => {
        const entry: Record<string, any> = { x: xVal };
        combinationSeries.forEach((series) => {
          entry[series.yKey] = data[series.yKey][index];
        });
        return entry;
      });
  
      options = {
        container,
        title: commonTitle,
        data: comboData,
        series: combinationSeries.map((series) => ({
          type: series.type as any,
          xKey: "x",
          yKey: series.yKey,
          name: series.name,
        })),
        axes: [
          { type: "category", position: "bottom" },
          { type: "number", position: "left" },
        ],
        legend: {
          enabled: true,
          position: "bottom",
        },
      } as AgCartesianChartOptions;
    } else {
      const baseData = data.x.map((xVal: any, index: number) => ({
        x: xVal,
        y: data.y[index],
        ...(chartType === "bubble" && { size: data.size[index] }),
      }));
  
      const baseSeries: any = {
        type: chartType,
        xKey: "x",
        yKey: "y",
        name: chartType,
      };
  
      if (chartType === "bubble") {
        baseSeries.sizeKey = "size";
      }
  
      options = {
        container,
        title: commonTitle,
        data: baseData,
        series: [baseSeries],
        axes: [
          { type: "category", position: "bottom" },
          { type: "number", position: "left" },
        ],
        legend: {
          enabled: true,
          position: "bottom",
        },
      } as AgCartesianChartOptions;
    }
  
    AgCharts.create(options);
  };
  