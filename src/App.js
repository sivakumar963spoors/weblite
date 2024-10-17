import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
// import HomePage from "./components/homePage/HomePage";
 import TaskCard from "./components/task/TaskCard";

function App() {
  return (
    <BrowserRouter>
<TaskCard/>
{/* <HomePage/> */}
      <Routes>
      
      </Routes>
    </BrowserRouter>
  );
}


export default App;
