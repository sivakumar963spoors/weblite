
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoutes from './components/navbar/AllRoutes';
import MenuTitleUpdater from "./components/navbar/MenuTitleUpdater";
import ScrollToTop from './components/navbar/ScrollToTop';
import TopBar from './components/navbar/TopBar';
import { theme } from "./styles/themes";
function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter> 
    <ScrollToTop/>
    <MenuTitleUpdater /> 
    <TopBar/>   
    <AllRoutes/>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
