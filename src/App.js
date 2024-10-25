import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import CustomerDetails from "./components/customers/CustomerDetails";
import Customers from "./components/customers/Customers";
import CustomersViewTyped from "./components/customers/CustomersViewTypedd";
import DashBoardComponent from "./components/dashboard/DashBoardComponent";
import HomePage from "./components/homePage/HomePage";
import KnowledgeBaseComponent from "./components/knoweldgebase/KnowledgeBaseComponent";
import TopBar from "./components/navbar/TopBar";
import KnowledgeBaseAll from "./components/knoweldgebase/KnowledgeBaseAll";


function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoardComponent />} />
        <Route path="/knowledgebase" element={<KnowledgeBaseAll/>} />
        <Route path="/knowledgebase/:id" element={<KnowledgeBaseComponent/>} />
         <Route path="/customers/viewtype/:id" element={<CustomersViewTyped/>}/>
        <Route path="/Allcustomers" element={<Customers/>}/>
        <Route path="/customer/details/:id" element={<CustomerDetails/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
