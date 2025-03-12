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
      "/customers/viewtype/:id": "Customer View",
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
    };

    // Extract pathname without params
    const cleanPath = location.pathname.replace(/\/\d+$/, "/*"); // Handles dynamic IDs

    const newTitle = pathToTitleMap[cleanPath] || "Home";
    dispatch(toggleMenuTitle(newTitle));
  }, [location, dispatch]);

  return null;
};

export default MenuTitleUpdater;
