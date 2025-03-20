import React from 'react'
import ViewArticle from "../../components/articles/ViewArticle";
import ViewActivity from "../../components/customers/customerActivity/ViewActivity";
import ViewDeatilsActivity from "../../components/customers/customerActivity/ViewDeatilsActivity";
import CustomerDetails from "../../components/customers/CustomerDetails";
import Customers from "../../components/customers/Customers";
import CustomersViewTyped from "../../components/customers/CustomersViewTypedd";
import DashBoardComponent from "../../components/dashboard/DashBoardComponent";
import DayPlanCreation from '../../components/dayplanner/DayPlanCreation';
import DayPlanner from '../../components/dayplanner/DayPlanner';
import AllFormDataTypes from '../../components/formdata/AllFormDataTypes';
import HomePage from "../../components/homePage/HomePage";
import KnowledgeBaseAll from "../../components/knoweldgebase/KnowledgeBaseAll";
import KnowledgeBaseComponent from "../../components/knoweldgebase/KnowledgeBaseComponent";
import AllLeavesDisplay from "../../components/leavesModule/AllLeavesDisplay";
import LeaveApply from "../../components/leavesModule/LeaveApply";
import Leaves_details from "../../components/leavesModule/Leaves_details";
import AllApprovals from '../../components/myapprovals/AllApprovals';
import FormApprovals from '../../components/myapprovals/formapprovals/FormApprovals';
import { Route, Routes } from 'react-router-dom';
import DayPlanViewEmp from '../dayplanner/DayPlanViewEmp';
import ChangePassword from '../password/ChangePassword';
import AddedLeavesDisplay from '../leavesModule/AddedLeavesDisplay';
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoardComponent />} />
        <Route path="/knowledgebase/manage" element={<KnowledgeBaseAll />} />
        <Route path="/knowledgebase/manage/new" element={<KnowledgeBaseComponent />} />
        <Route path="/manage/article/:id" element={<ViewArticle/>}/>
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
        <Route path="/getForm" element={<AllFormDataTypes/>} />
        <Route path="/view/leaves/new" element={<AllLeavesDisplay />} />
        <Route path='/view/leaves' element={<AddedLeavesDisplay/>}/>
        <Route path="/leave/my/create" element={<LeaveApply />} />
        <Route path="/leave/view/:id" element={<Leaves_details/>}/>
        <Route path='/dayplanner/customers' element={<DayPlanner/>}/>
        <Route path='/dayPlan/creation' element={<DayPlanCreation/>}/>
<Route path='/view/all/employee' element={<DayPlanViewEmp/>}/>
        <Route path='/view/approvals' element={<AllApprovals/>}/>
        <Route path='/status/view/:id' element={<FormApprovals/>}/>
        <Route path='/password/update' element={<ChangePassword/>}/>
      </Routes>
     
    </>
  )
}

export default AllRoutes
