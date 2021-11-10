import "./App.css";
import Scheduler from "./components/Scheduler";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div className="App">
        <Scheduler />
      </div>
    </LocalizationProvider>
  );
}

export default App;
