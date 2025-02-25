import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ViewActivity from "./components/customers/customerActivity/ViewActivity";
import ViewDeatilsActivity from "./components/customers/customerActivity/ViewDeatilsActivity";
import CustomerDetails from "./components/customers/CustomerDetails";
import Customers from "./components/customers/Customers";
import CustomersViewTyped from "./components/customers/CustomersViewTypedd";
import DashBoardComponent from "./components/dashboard/DashBoardComponent";
import HomePage from "./components/homePage/HomePage";
import KnowledgeBaseAll from "./components/knoweldgebase/KnowledgeBaseAll";
import KnowledgeBaseComponent from "./components/knoweldgebase/KnowledgeBaseComponent";
import AllLeaves_display from "./components/leavesModule/AllLeaves_display";
import Leave_apply from "./components/leavesModule/Leave_apply";
import TopBar from "./components/navbar/TopBar";
import GetFormsData from "./getforms/GetFormsData";
import Leaves_details from "./components/leavesModule/Leaves_details";

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"poppins", sans-serif !important',
      textTransform: 'capitalize',
    
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
 
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoardComponent />} />
        <Route path="/knowledgebase" element={<KnowledgeBaseAll />} />
        <Route path="/knowledgebase/:id" element={<KnowledgeBaseComponent />} />
        <Route
          path="/customers/viewtype/:id"
          element={<CustomersViewTyped />}
        />
        <Route path="/Allcustomers" element={<Customers />} />
        <Route path="/customer/details/:id" element={<CustomerDetails />} />
        <Route path="/customer/viewactivity" element={<ViewActivity />} />
        <Route
          path="/customer/viewactivity/details"
          element={<ViewDeatilsActivity />}
        />
        <Route path="/getForm" element={<GetFormsData />} />
        <Route path="/view/leaves/new" element={<AllLeaves_display />} />
        <Route path="/leave/my/create" element={<Leave_apply />} />
        <Route path="/leave/view/:id" element={<Leaves_details/>}/>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
