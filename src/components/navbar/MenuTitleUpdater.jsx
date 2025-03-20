import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleMenuTitle } from "../../redux/slices/MenuSlice";

const MenuTitleUpdater = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const pathToTitleMap = {
      "/": "Home",
      "/dashboard": "Dashboard",
      "/knowledgebase/manage": "Knowledge Base",
      "/knowledgebase/manage/new": "New Knowledge Base",
      "/manage/article/:id": "View Article",
      "/customers/viewtype/:id": "Customers",
      "/Allcustomers": "All Customers",
      "/customer/details/:id": "Customer Details",
      "/customer/viewactivity": "View Activity",
      "/customer/viewactivity/details": "Activity Details",
      "/getForm": "Forms",
      "/view/leaves/new": "Leave Requests",
      "/leave/my/create": "Apply Leave",
      "/leave/view/:id": "Leave Details",
      "/dayplanner/customers": "Day Planner",
      "/dayPlan/creation": "Create Day Plan",
      "/view/approvals": "Approvals",
      "/status/view/:id": "Approval Details",
      "/view/all/employee":'employee',
      '/password/update':'change password'
    };

    // **1️⃣ Extract Path Without Query Params**
    const pathname = location.pathname.split("?")[0];

    // **2️⃣ Match Static & Dynamic Routes**
    const matchedPath = Object.keys(pathToTitleMap).find((pattern) => {
      if (pattern === pathname) return true; // Exact match

      const regexPattern = `^${pattern.replace(/:\w+/g, "[^/]+")}$`; // Replace dynamic params with regex
      return new RegExp(regexPattern).test(pathname);
    });

    let newTitle = pathToTitleMap[matchedPath] || "Home";

    // **3️⃣ Handle Query Parameters for Knowledge Base & Leaves**
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
    }

    console.log("Setting menu title:", newTitle); // Debug log

    // **4️⃣ Dispatch Updated Title**
    dispatch(toggleMenuTitle(newTitle));
  }, [location, dispatch]);

  return null;
};

export default MenuTitleUpdater;
