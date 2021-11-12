import "./App.css";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Scheduler from "./components/scheduler/Scheduler";
import ScheduledItems from "./components/scheduled-items/ScheduledItems";

function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div className="App">
        <Scheduler />
        <ScheduledItems />
      </div>
    </LocalizationProvider>
  );
}

export default App;
