import './App.css';
import DataChart from './components/DataChart';
import { ChartTypes } from './constants/enum';

const App: React.FC = () => {
  // Sample data for a Line, Bar, Area, Scatter, and Pie chart
  const sampleData = {
    x: ["Jan", "Feb", "Mar", "Apr", "May"], // X-axis labels
    y: [50, 70, 30, 90, 60],               // Y-axis values
  };

  // Sample data for a Bubble chart
  const bubbleChartData = {
    x: ["Jan", "Feb", "Mar", "Apr", "May"], // X-axis labels
    y: [50, 70, 30, 90, 60],               // Y-axis values
    size: [10, 20, 15, 25, 10],            // Size values for bubbles
  };

  // Sample data for a Donut chart
  const donutChartData = {
    x: ["Category A", "Category B", "Category C", "Category D"], // Categories
    y: [40, 30, 20, 10],                                        // Values for each category
  };

  // Sample data for a Combination chart
  const combinationData = {
    x: ["Jan", "Feb", "Mar", "Apr", "May"], // X-axis labels
    lineY: [50, 70, 30, 90, 60],            // Y-axis values for the Line series
    barY: [20, 40, 60, 80, 100],            // Y-axis values for the Bar series
  };

  // Series configuration for the Combination chart
  const combinationSeries = [
    { type: ChartTypes.Line, yKey: "lineY", name: "Line Series" }, // Line series
    { type: ChartTypes.Bar, yKey: "barY", name: "Bar Series" },   // Bar series
  ];

  // Array of chart configurations for dynamic rendering
  const charts = [
    { type: ChartTypes.Line, data: sampleData, title: "Line Chart" },
    { type: ChartTypes.Bubble, data: bubbleChartData, title: "Bubble Chart" },
    { type: ChartTypes.Donut, data: donutChartData, title: "Donut Chart" },
    { type: ChartTypes.Bar, data: sampleData, title: "Bar Chart" },
    { type: ChartTypes.Area, data: sampleData, title: "Area Chart" },
    { type: ChartTypes.Pie, data: sampleData, title: "Pie Chart" },
    { type: ChartTypes.Scatter, data: sampleData, title: "Scatter Chart" },
    {
      type: ChartTypes.Combination,
      data: combinationData,
      combinationSeries,
      title: "Combination Chart",
    },
  ];

  return (
    <div>
      <h2>Reusable AG Charts Wrapper</h2>
      {/* Dynamically render charts based on the `charts` array */}
      {charts.map((chart, index) => (
        <div key={index} style={{ marginBottom: "40px" }}>
          {/* Chart title */}
          <h3>{chart.title}</h3>
          {/* Render the DataChart component */}
          <DataChart
            chartType={chart.type}
            data={chart.data}
            combinationSeries={chart.combinationSeries}
          />
        </div>
      ))}
    </div>
  );
};

export default App;