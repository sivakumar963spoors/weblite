import React from "react";
import { Route, Routes } from "react-router-dom";
import ViewArticle from "../../components/articles/ViewArticle";
import ViewActivity from "../../components/customers/customerActivity/ViewActivity";
import ViewDeatilsActivity from "../../components/customers/customerActivity/ViewDeatilsActivity";
import CustomerDetails from "../../components/customers/CustomerDetails";
import Customers from "../../components/customers/Customers";
import CustomersViewTyped from "../../components/customers/CustomersViewTypedd";
import DashBoardComponent from "../../components/dashboard/DashBoardComponent";
import DayPlanCreation from "../../components/dayplanner/DayPlanCreation";
import DayPlanner from "../../components/dayplanner/DayPlanner";
import AllFormDataTypes from "../../components/formdata/AllFormDataTypes";
import HomePage from "../../components/homePage/HomePage";
import KnowledgeBaseAll from "../../components/knoweldgebase/KnowledgeBaseAll";
import KnowledgeBaseComponent from "../../components/knoweldgebase/KnowledgeBaseComponent";
import AllLeavesDisplay from "../../components/leavesModule/AllLeavesDisplay";
import LeaveApply from "../../components/leavesModule/LeaveApply";
import AllApprovals from "../../components/myapprovals/AllApprovals";
import FormApprovals from "../../components/myapprovals/formapprovals/FormApprovals";
import ReusableCarousalDayPlan from "../common/ReusableCarousalDayPlan";
import DayPlanViewCustomer from "../dayplanner/DayPlanViewCustomer";
import DayPlanViewEmp from "../dayplanner/DayPlanViewEmp";
import ViewFormNew from "../forms/ViewFormNew";
import ViewForms from "../forms/ViewForms";
import AddedLeavesDisplay from "../leavesModule/AddedLeavesDisplay";
import LeavesDetails from "../leavesModule/LeavesDetails";
import ChangePassword from "../password/ChangePassword";
import WorkDetailView from "../works/WorkDetailView";
import WorkspecActionNew from "../works/WorkspecActionNew";
import WorkSpecByTeam from "../works/WorkSpecByTeam";
import PageNotFound from "../PageNotFound";
import AllReports from "../reports/AllReports";
import EmployeeReport from "../reports/EmployeeReport";
import EmpReportDetails from "../reports/EmpReportDetails";
import DistanceTravelReport from "../reports/distancetravelReport/DistanceTravelReport";
import DistanceReportDetails from "../reports/distancetravelReport/DistanceReportDetails";
import EmpWiseActivityreport from "../reports/employeeactiviwise/EmpWiseActivityreport";
import EmpWiseActivityDetails from "../reports/employeeactiviwise/EmpWiseActivityDetails";
import DayPlanReport from "../reports/dayplanreport/DayPlanReport";
import DayPlanDetails from "../reports/dayplanreport/DayPlanDetails";
import SignInSignOutReport from "../reports/signinsignoutreport/SignInSignOutReport";
import SignInReportDetails from "../reports/signinsignoutreport/SignInReportDetails";
import AdvanceActivityReport from "../reports/advActivity/AdvanceActivityReport";
import PlanVsActualDetails from "../reports/planVsActual/PlanVsActualDetails";
import PlanVsActualReport from "../reports/planVsActual/PlanVsActualReport";
const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoardComponent />} />
        <Route path="/knowledgebase/manage" element={<KnowledgeBaseAll />} />
        <Route
          path="/knowledgebase/manage/new"
          element={<KnowledgeBaseComponent />}
        />
        <Route path="/manage/article/:id" element={<ViewArticle />} />
        <Route
          path="/view/all/customers/typed"
          element={<CustomersViewTyped />}
        />
        <Route path="/view/all/customers" element={<Customers />} />
        <Route path="/customer/details/view" element={<CustomerDetails />} />
        <Route path="/customer/view/activity" element={<ViewActivity />} />
        <Route
          path="/customer/view/activity/forms"
          element={<ViewDeatilsActivity />}
        />
        <Route path="/add/form/:id" element={<AllFormDataTypes />} />
        <Route path="/view/leaves/new" element={<AllLeavesDisplay />} />
        <Route path="/view/leaves" element={<AddedLeavesDisplay />} />
        <Route path="/leave/my/create" element={<LeaveApply />} />
        <Route path="/leave/view/:id" element={<LeavesDetails />} />
        <Route path="/dayplanner/customers" element={<DayPlanner />} />
        <Route path="/dayPlan/creation" element={<DayPlanCreation />} />
        <Route path="/view/all/employees" element={<DayPlanViewEmp />} />
        <Route path="/view/approvals" element={<AllApprovals />} />
        <Route path="/status/view/:id" element={<FormApprovals />} />
        <Route path="/password/update" element={<ChangePassword />} />
        <Route path="/view/all/customers" element={<DayPlanViewCustomer />} />
        <Route path="/dyaplanroute" element={<ReusableCarousalDayPlan />} />
        <Route path="/view/forms" element={<ViewForms />} />
        <Route path="/view/forms/new" element={<ViewFormNew />} />
        <Route path="/workSpec/actions/new" element={<WorkspecActionNew />} />
        <Route path="/work/details/view" element={<WorkDetailView />} />
        <Route path="/mobile/reports/showAllReports" element={<AllReports />} />
        <Route
          path="/workSpec/actionable/details/byTeam"
          element={<WorkSpecByTeam />}
        />
        <Route
          path="/work/details/view/:workspecid"
          element={<WorkDetailView />}
        />
        <Route
          path="/mobile/reports/:empId/:reportId"
          element={<EmployeeReport />}
        />
        <Route
          path="/mobile/reports/empActivityReport"
          element={<EmpReportDetails />}
        />
        <Route
          path="/mobile/report/user/trackDistanceReport"
          element={<DistanceTravelReport />}
        />
        <Route
          path="/mobile/report/distanceTraveledToday/:empId"
          element={<DistanceReportDetails />}
        />
        <Route
          path="/mobile/report/employee/activity/wise/summary/:empId/:reportId"
          element={<EmpWiseActivityreport />}
        />
        <Route
          path="/service/employee/activity/wise/summary"
          element={<EmpWiseActivityDetails />}
        />
        <Route
          path="/service/report/land/dayPlan/:empId/:reportId"
          element={<DayPlanReport />}
        />
        <Route
          path="/service/send/dayPlanReport/xls"
          element={<DayPlanDetails />}
        />
        <Route
          path="/report/employee/signin/signout/:empId/:reportId"
          element={<SignInSignOutReport />}
        />
        <Route
          path="/service/report/employee/signin/signout/details/:empId"
          element={<SignInReportDetails />}
        />
        <Route
          path="/service/custom/activityReport/:empId/:reportId"
          element={<AdvanceActivityReport />}
        />
        <Route
          path="/extraService/get/dayplan/planned/actual/visits/report/:empId/:reportId"
          element={<PlanVsActualReport />}
        />
        <Route
          path="extraService/generate/planned/actual/visits"
          element={<PlanVsActualDetails />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
