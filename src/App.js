import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";


function App() {
  return (
    <BrowserRouter>

<TaskCard/>
{/* <HomePage/> */}
      <Route/>
    <TopBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoardComponent />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
