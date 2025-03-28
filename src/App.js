
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoutes from './components/navbar/AllRoutes';
import MenuTitleUpdater from "./components/navbar/MenuTitleUpdater";
import ScrollToTop from './components/navbar/ScrollToTop';
import TopBar from './components/navbar/TopBar';
function App() {
  return (
   
    <BrowserRouter> 
    <ScrollToTop/>
    <MenuTitleUpdater /> 
       <TopBar/>
    <AllRoutes/>
{/* <Drag/> */}
{/* <DummyRest/> */}
    </BrowserRouter>
   
  );
}

export default App;
