import {
  AgCartesianChartOptions,
  AgPolarChartOptions,
  AgChartOptions,
  AgCharts,
} from "ag-charts-community";
import { ChartData } from "./chartInterfaces";

// Define the supported chart types
export type ChartType =
  | "line"
  | "area"
  | "bar"
  | "scatter"
  | "bubble"
  | "pie"
  | "donut"
  | "combination";

// Define the structure for combination series
type CombinationSeries = {
  type: ChartType; // The type of chart for this series (e.g., line, bar)
  yKey: string;    // The key for the Y-axis data
  name: string;    // The name of the series (used in legends)
};

// Function to initialize the chart
export const initializeChart = (
  chartType: ChartType,         // The type of chart to render
  data: ChartData,                    // The data to be displayed in the chart
  container: HTMLDivElement,    // The container element for the chart
  combinationSeries?: CombinationSeries[] // Optional series for combination charts
): AgChartOptions | void => {

    // Validate input data
    if (!data || !data.x) {
      console.error("Invalid data provided for chart initialization.");
      return;
    } else if (!data || !Array.isArray(data.x) || data.x.length === 0) {
      console.error("Invalid or empty data provided for chart initialization.");
      return;
    } else if (chartType !== "pie" && chartType !== "donut" && chartType !== "combination" && (!data.y || !Array.isArray(data.y))) {
      console.error("Y-axis data is required for this chart type.");
      return;
    } else if (chartType === "bubble" && (!data.size || !Array.isArray(data.size))) {
      console.error("Size data is required for Bubble charts.");
      return;
    }


  let options: AgChartOptions; // Define the chart options object

  // Common title configuration for all charts
  const commonTitle = {
    text: chartType, // Use the chart type as the title
    fontSize: 18,    // Font size for the title
  };

  // Handle Pie and Donut charts
  if (chartType === "pie" || chartType === "donut") {
    // Format the data for Pie/Donut charts
    const pieData = data.x.map((label: string, index: number) => ({
      category: label,
      value: data.y[index],
    }));

    // Define the chart options for Pie/Donut charts
    options = {
      container,
      title: commonTitle,
      data: pieData,
      series: [
        {
          type: chartType === "pie" ? "pie" : "donut", // Set the series type
          angleKey: "value",                          // Key for the angle values
          calloutLabelKey: "category",               // Key for the labels
          innerRadiusRatio: chartType === "donut" ? 0.6 : 0, // Hollow center for Donut
        },
      ],
      legend: {
        enabled: true,       // Enable the legend
        position: "bottom",  // Position the legend at the bottom
      },
    } as AgPolarChartOptions;
  }
  // Handle Combination charts
  else if (chartType === "combination" && combinationSeries) {
    // Format the data for Combination charts
    const comboData = data.x.map((xVal: any, index: number) => {
      const entry: Record<string, any> = { x: xVal };
      combinationSeries.forEach((series) => {
        entry[series.yKey] = data[series.yKey][index];
      });
      return entry;
    });

    // Define the chart options for Combination charts
    options = {
      container,
      title: commonTitle,
      data: comboData,
      series: combinationSeries.map((series) => ({
        type: series.type as any, // Set the series type
        xKey: "x",               // Key for the X-axis data
        yKey: series.yKey,       // Key for the Y-axis data
        name: series.name,       // Name of the series
      })),
      axes: [
        { type: "category", position: "bottom" }, // X-axis configuration
        { type: "number", position: "left" },     // Y-axis configuration
      ],
      legend: {
        enabled: true,       // Enable the legend
        position: "bottom",  // Position the legend at the bottom
      },
    } as AgCartesianChartOptions;
  }
  // Handle other chart types (e.g., Line, Bar, Bubble)
  else {
    // Format the data for basic charts
    const baseData = data.x.map((xVal: any, index: number) => ({
      x: xVal,
      y: data.y[index],
      ...(chartType === "bubble" && { size: data.size[index] }), // Add size for Bubble charts
    }));

    // Define the series configuration for basic charts
    const baseSeries: any = {
      type: chartType, // Set the series type
      xKey: "x",       // Key for the X-axis data
      yKey: "y",       // Key for the Y-axis data
      name: chartType, // Use the chart type as the series name
    };

    // Add sizeKey for Bubble charts
    if (chartType === "bubble") {
      baseSeries.sizeKey = "size";
    }

    // Define the chart options for basic charts
    options = {
      container,
      title: commonTitle,
      data: baseData,
      series: [baseSeries],
      axes: [
        { type: "category", position: "bottom" }, // X-axis configuration
        { type: "number", position: "left" },     // Y-axis configuration
      ],
      legend: {
        enabled: true,       // Enable the legend
        position: "bottom",  // Position the legend at the bottom
      },
    } as AgCartesianChartOptions;
  }

  // Create the chart using the configured options
  AgCharts.create(options);
};

