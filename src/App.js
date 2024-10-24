import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Customers from "./components/customers/Customers";
import DashBoardComponent from "./components/dashboard/DashBoardComponent";
import HomePage from "./components/homePage/HomePage";
import KnowledgeBaseComponent from "./components/knoweldgebase/KnowledgeBaseComponent";
import TopBar from "./components/navbar/TopBar";
import CustomersViewTyped from "./components/customers/CustomersViewTypedd";


function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoardComponent />} />
        <Route path="/knowledgebase/:id" element={<KnowledgeBaseComponent/>} />
         <Route path="/customers/viewtype/:id" element={<CustomersViewTyped/>}/>
        <Route path="/Allcustomers" element={<Customers/>}/>
        <Route path="/customer/details/:id"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
