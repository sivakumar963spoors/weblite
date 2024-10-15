import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TopBar from "./components/navbar/TopBar";
import HomePage from "./components/homePage/HomePage";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
