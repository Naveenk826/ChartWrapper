// Enum to define the supported chart types
export enum ChartTypes {
  Bar = "bar",           // Bar chart
  Line = "line",         // Line chart
  Area = "area",         // Area chart
  Scatter = "scatter",   // Scatter chart
  Pie = "pie",           // Pie chart
  Bubble = "bubble",     // Bubble chart
  Donut = "donut",       // Donut chart (a variation of Pie chart with a hollow center)
  Combination = "combination", // Combination chart (multiple series with different chart types)
}

// Type alias for the ChartTypes enum to allow string literals
export type ChartType = `${ChartTypes}`;
