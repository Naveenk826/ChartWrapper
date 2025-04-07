import './App.css';
import DataChart from './components/DataChart';
import { ChartTypes } from './constants/enum';

const App: React.FC = () => {
  const sampleData = {
    x: ["Jan", "Feb", "Mar", "Apr", "May"],
    y: [50, 70, 30, 90, 60],
  };

  return (
    <div>
      <h2>Reusable AG Charts Wrapper</h2>
      <DataChart chartType={ChartTypes.Line} data={sampleData} />
    </div>
  );
};

export default App;
