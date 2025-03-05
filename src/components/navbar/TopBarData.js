import HttpsIcon from "@mui/icons-material/Https";
import bluecustomerIcon from "../../assets/menu_svg_filled/Blue/Customers.svg";
import blueDashboard from "../../assets/menu_svg_filled/Blue/Dashboard.svg";
import bluedayplanIcon from "../../assets/menu_svg_filled/Blue/Day_Plans.svg";
import blueHomeIcon from "../../assets/menu_svg_filled/Blue/Home.svg";
import blueLeaves from '../../assets/menu_svg_filled/Blue/Leaves.svg';
import customer from "../../assets/menu_svg_filled/Customers.svg";
import dashboard from "../../assets/menu_svg_filled/Dashboard.svg";
import dayplan from "../../assets/menu_svg_filled/Day_Plans.svg";
import home from "../../assets/menu_svg_filled/Home.svg";
import leaves from '../../assets/menu_svg_filled/Leaves.svg';
import knowledgebase from '../../assets/menu_svg_filled/Knowledge_Base.svg'
import blueknowledge from '../../assets/menu_svg_filled/Blue/Knowledge_Base.svg'
import myapproval from '../../assets/menu_svg_filled/My_approvals.svg'
import bluemyapproval from '../../assets/menu_svg_filled/Blue/My_approvals.svg'
export const menuItem = [
  {
    menuTitle: "Home",
    menuIcon: home,
    blueMenuIcon: blueHomeIcon,
  },
  {
    menuTitle: "Dashboard",

    menuIcon: dashboard,
    blueMenuIcon: blueDashboard,
  },
  {
    menuTitle: "Customers",
    menuIcon: customer,
    blueMenuIcon: bluecustomerIcon,
  },
  {
    menuTitle: "My Approvals",
    menuIcon: myapproval,
    blueMenuIcon: bluemyapproval,
  },
  {
    menuTitle: "Knowledge Base",
    menuIcon: knowledgebase,
    blueMenuIcon: blueknowledge,
  },
  {
    menuTitle: "leaves",
    menuIcon:leaves ,
    blueMenuIcon: blueLeaves,
  },
  
  {
    menuTitle: "Day Plans",
    menuIcon: dayplan,
    blueMenuIcon: bluedayplanIcon,
  },
  {
    menuTitle: "Reset password",
    menuIcon: <HttpsIcon sx={{ color: "#FFF" }} />,
    blueMenuIcon: <HttpsIcon sx={{ color: "#FFF" }} />,
  },
  {
    menuTitle: "Logout",
    menuIcon: <HttpsIcon sx={{ color: "#FFF" }} />,
    blueMenuIcon: <HttpsIcon sx={{ color: "#FFF" }} />,
  },
];
