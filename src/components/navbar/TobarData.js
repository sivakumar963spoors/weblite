import HomeIcon from '@mui/icons-material/Home';
import WindowIcon from "@mui/icons-material/Window";
import HttpsIcon from '@mui/icons-material/Https';
export const menuItem = [
  {
    menuTitle: "Home",
    menuIcon:<HomeIcon sx={{color:'#FFF'}}/> ,
  },
  {
    menuTitle: "Dashboard",
    menuIcon: <WindowIcon sx={{color:'#FFF'}}/>,
  },
  {
    menuTitle: "Reset password",
    menuIcon:<HttpsIcon sx={{color:'#FFF'}}/>,
  },
];
