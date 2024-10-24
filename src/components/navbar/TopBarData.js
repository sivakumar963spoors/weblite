import HttpsIcon from "@mui/icons-material/Https";
import blueDashboard from "../../assets/menu_svg_filled/Blue/Dashboard.svg";
import blueHomeIcon from "../../assets/menu_svg_filled/Blue/Home.svg";
import dashboard from "../../assets/menu_svg_filled/Dashboard.svg";
import home from "../../assets/menu_svg_filled/Home.svg";
import customer from "../../assets/menu_svg_filled/Customers.svg";
import bluecustomerIcon from "../../assets/menu_svg_filled/Blue/Customers.svg";
import dayplan from "../../assets/menu_svg_filled/Day_Plans.svg";
import bluedayplanIcon from "../../assets/menu_svg_filled/Blue/Day_Plans.svg";
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
