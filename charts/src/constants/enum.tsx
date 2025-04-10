export enum ChartTypes {
  Bar = "bar",
  Line = "line",
  Area = "area",
  Scatter = "scatter",
  Pie = "pie",
  Bubble = "bubble",
  Donut = "donut",
  Combination = "combination",
}

export type ChartType = `${ChartTypes}`;
