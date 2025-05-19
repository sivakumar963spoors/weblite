import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleMenuTitle } from "../../redux/slices/MenuSlice";

const MenuTitleUpdater = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const pathToTitleMap = {
      "/home": "Home",
      "/dashboard": "Dashboard",
      "/knowledgebase/manage": "Knowledge Base",
      "/knowledgebase/manage/new": "New Knowledge Base",
      "/manage/article/:id": "View Article",
      "/customers/viewtype/:id": "Customers",
      "/Allcustomers": "All Customers",
      "/customer/details/view": "Customer Details",
      "/customer/viewactivity": "View Activity",
      "/customer/viewactivity/forms": "Activity Details",
      "/add/form/:id": "Forms",
      "/view/leaves/new": "Leave Requests",
      "/leave/my/create": "Apply Leave",
      "/leave/view/:id": "Leave Details",
      "/dayplanner/customers": "Day Planner",
      "/dayPlan/creation": "Create Day Plan",
      "/view/approvals": "Approvals",
      "/status/view/:id": "Approval Details",
      "/view/all/employees": "employees",
      "/view/all/customers": "customers",
      "/password/update": "change password",
      "/view/forms": "",
      "/view/forms/new": "",
      "/mobile/reports/showAllReports": "Reports",
      "/mobile/reports/:empId/:reportId": "Reports",
      "/mobile/report/user/trackDistanceReport": "Reports",
      "/mobile/reports/empActivityReport": "Report details",
      "/mobile/report/distanceTraveledToday/:empId": "Report details",
      "/service/employee/activity/wise/summary": "Repory details",
      "/service/report/land/dayPlan/:empId/:reportId": "Report",
      "/report/employee/signin/signout/:empId/:reportId": "Report",
      "/service/report/employee/signin/signout/details/:empId":
        "Report details",
      "/service/custom/activityReport/:empId/:reportId": "Reports",
      "/extraService/get/dayplan/planned/actual/visits/report/:empId/:reportId":
        "Reports",
      "/extraService/generate/planned/actual/visits": "Report details",
    };
    const pathname = location.pathname.split("?")[0];

    const matchedPath = Object.keys(pathToTitleMap).find((pattern) => {
      if (pattern === pathname) return true;

      const regexPattern = `^${pattern.replace(/:\w+/g, "[^/]+")}$`;
      return new RegExp(regexPattern).test(pathname);
    });

    let newTitle = pathToTitleMap[matchedPath] || "";

    const urlParams = new URLSearchParams(location.search);
    const viewType = urlParams.get("viewType");
    const leaveMenuType = urlParams.get("leaveMenuType");

    if (pathname.startsWith("/knowledgebase/manage")) {
      if (viewType !== null) {
        newTitle = `Knowledge Base `;
      } else {
        newTitle = `Knowledge Base`;
      }
    } else if (pathname === "/view/leaves/new") {
      if (viewType && leaveMenuType) {
        newTitle = `Leave Requests`;
      } else if (viewType) {
        newTitle = `Leave Requests`;
      } else if (leaveMenuType) {
        newTitle = `Leave Requests `;
      }
    } else if (pathname === "/view/all/employees") {
      newTitle = `Employee`;
    } else if (pathname === "/service/employee/activity/wise/summary") {
      newTitle = `report details`;
    } else if (pathname === "/mobile/reports/:empId/:reportId") {
      newTitle = `reports`;
    }else if (pathToTitleMap === "/customer/details/view"){
      newTitle =`Customer Details`
    }

    dispatch(toggleMenuTitle(newTitle));
  }, [location, dispatch]);

  return null;
};

export default MenuTitleUpdater;
