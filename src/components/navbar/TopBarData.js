import HomeIcon from '@mui/icons-material/Home';
import WindowIcon from "@mui/icons-material/Window";
import HttpsIcon from '@mui/icons-material/Https';
import home from '../../assets/menu_svg_filled/Home.svg'
import dashboard from '../../assets/menu_svg_filled/Dashboard.svg';
import blueHomeIcon from '../../assets/menu_svg_filled/Blue/Home.svg'
import blueDashboard from '../../assets/menu_svg_filled/Blue/Dashboard.svg'
export const menuItem = [
  {
    menuTitle: "Home",
    menuIcon:home ,
    blueMenuIcon:blueHomeIcon

  },
  {
    menuTitle: "Dashboard",
  
    menuIcon:dashboard ,
    blueMenuIcon:blueDashboard

  },
  {
    menuTitle: "Reset password",
    menuIcon:<HttpsIcon sx={{color:'#FFF'}}/>,
    blueMenuIcon:<HttpsIcon sx={{color:'#FFF'}}/>
    // menuIcon:{home} ,

  },
];
