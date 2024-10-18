import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashBoardComponent from './components/dashboard/DashBoardComponent';
import HomePage from "./components/homePage/HomePage";
import TopBar from "./components/navbar/TopBar";

function App() {
  return (
    <BrowserRouter>
   <TopBar/>
      <Routes>
      
         <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoardComponent />} /> 
      </Routes>

    

    </BrowserRouter>
  );
}

export default App;
