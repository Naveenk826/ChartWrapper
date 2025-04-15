import { ChartTypes } from "../constants/enum";

// Interface to define the structure of chart data
export interface ChartData {
  x: string[];          // Array of X-axis values (e.g., categories or labels)
  y: number[];         // array of Y-axis values (e.g., data points)
  size: number[];      // array for size values (used in Bubble charts)
  [key: string]: any;   // Additional dynamic properties for custom data
}

// Interface to define a series for combination charts
export interface CombinationSeries {
  type: ChartTypes;     // The type of chart for this series (e.g., line, bar)
  yKey: string;         // The key for the Y-axis data in the chart data
  name?: string;        // The name of the series (used in legends)
}