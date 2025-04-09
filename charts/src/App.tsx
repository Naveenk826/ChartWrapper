import './App.css';
import DataChart from './components/DataChart';
import { ChartTypes } from './constants/enum';

const App: React.FC = () => {
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

  return (
    <div>
      <h2>Reusable AG Charts Wrapper</h2>
      <DataChart chartType={ChartTypes.Line} data={sampleData} />
      <DataChart chartType={ChartTypes.Bubble} data={bubbleChartData} />
      <DataChart chartType={ChartTypes.Donut} data={donutChartData} />
      <DataChart chartType={ChartTypes.Bar} data={sampleData} />
      <DataChart chartType={ChartTypes.Area} data={sampleData} />
      <DataChart chartType={ChartTypes.Pie} data={sampleData} />
      <DataChart chartType={ChartTypes.Scatter} data={sampleData} />
      <DataChart
        chartType={ChartTypes.Combination}
        data={combinationData}
        combinationSeries={combinationSeries}
      />
    </div>
  );
};

export default App;