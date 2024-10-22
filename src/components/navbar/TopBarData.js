import HttpsIcon from '@mui/icons-material/Https';
import blueDashboard from '../../assets/menu_svg_filled/Blue/Dashboard.svg';
import blueHomeIcon from '../../assets/menu_svg_filled/Blue/Home.svg';
import dashboard from '../../assets/menu_svg_filled/Dashboard.svg';
import home from '../../assets/menu_svg_filled/Home.svg';
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
