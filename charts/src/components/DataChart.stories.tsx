
import DataChart from "./DataChart";
import { ChartTypes } from "../constants/enum";

export default {
  title: "Components/DataChart",
  component: DataChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`DataChart\` component is a reusable wrapper for AG Charts. It supports multiple chart types, including Line, Bar, Pie, Donut, Bubble, Scatter, and Combination.

### How to Use
1. Import the \`DataChart\` component and the \`ChartTypes\` enum:
\`\`\`
import DataChart from './components/DataChart';
import { ChartTypes } from './constants/enum';
\`\`\`

2. Pass the required \`chartType\` and \`data\` props to render a chart:
\`\`\`
<DataChart chartType={ChartTypes.Line} data={sampleData} />
\`\`\`

3. For combination charts, pass the \`combinationSeries\` prop:
\`\`\`
<DataChart
  chartType={ChartTypes.Combination}
  data={combinationData}
  combinationSeries={combinationSeries}
/>
\`\`\`

### Props
- \`chartType\` (required): The type of chart to render. Available options are:
  - \`ChartTypes.Line\`
  - \`ChartTypes.Bubble\`
  - \`ChartTypes.Donut\`
  - \`ChartTypes.Bar\`
  - \`ChartTypes.Area\`
  - \`ChartTypes.Pie\`
  - \`ChartTypes.Scatter\`
  - \`ChartTypes.Combination\`
- \`data\` (required): The data to render in the chart. The structure depends on the chart type.
- \`combinationSeries\` (optional): Used for combination charts to define multiple series.

### Example Data Structures
#### Line / Bar / Area / Pie Chart
\`\`\`tsx
const sampleData = {
  x: ["Jan", "Feb", "Mar", "Apr", "May"],
  y: [50, 70, 30, 90, 60],
};
\`\`\`

#### Bubble Chart
\`\`\`tsx
const bubbleChartData = {
  x: ["Jan", "Feb", "Mar", "Apr", "May"],
  y: [50, 70, 30, 90, 60],
  size: [10, 20, 15, 25, 10],
};
\`\`\`

#### Donut Chart
\`\`\`tsx
const donutChartData = {
  x: ["Category A", "Category B", "Category C", "Category D"],
  y: [40, 30, 20, 10],
};
\`\`\`

#### Combination Chart
\`\`\`tsx
const combinationData = {
  x: ["Jan", "Feb", "Mar", "Apr", "May"],
  lineY: [50, 70, 30, 90, 60],
  barY: [20, 40, 60, 80, 100],
};

const combinationSeries = [
  { type: ChartTypes.Line, yKey: "lineY", name: "Line Series" },
  { type: ChartTypes.Bar, yKey: "barY", name: "Bar Series" },
];
\`\`\`
        `,
      },
    },
  },
};

const sampleData = {
  x: ["Jan", "Feb", "Mar", "Apr", "May"],
  y: [50, 70, 30, 90, 60],
};

const bubbleChartData = {
  x: ["Jan", "Feb", "Mar", "Apr", "May"],
  y: [50, 70, 30, 90, 60],
  size: [10, 20, 15, 25, 10],
};

const donutChartData = {
  x: ["Category A", "Category B", "Category C", "Category D"],
  y: [40, 30, 20, 10],
};

const combinationData = {
  x: ["Jan", "Feb", "Mar", "Apr", "May"],
  lineY: [50, 70, 30, 90, 60],
  barY: [20, 40, 60, 80, 100],
};

const combinationSeries = [
  { type: ChartTypes.Line, yKey: "lineY", name: "Line Series" },
  { type: ChartTypes.Bar, yKey: "barY", name: "Bar Series" },
];

export const LineChart = () => <DataChart chartType={ChartTypes.Line} data={sampleData} />;
export const BubbleChart = () => <DataChart chartType={ChartTypes.Bubble} data={bubbleChartData} />;
export const DonutChart = () => <DataChart chartType={ChartTypes.Donut} data={donutChartData} />;
export const BarChart = () => <DataChart chartType={ChartTypes.Bar} data={sampleData} />;
export const AreaChart = () => <DataChart chartType={ChartTypes.Area} data={sampleData} />;
export const PieChart = () => <DataChart chartType={ChartTypes.Pie} data={sampleData} />;
export const ScatterChart = () => <DataChart chartType={ChartTypes.Scatter} data={sampleData} />;
export const CombinationChart = () => (
  <DataChart
    chartType={ChartTypes.Combination}
    data={combinationData}
    combinationSeries={combinationSeries}
  />
);