 import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "./components/credentials/login/SignIn";
import AllRoutes from "./components/navbar/AllRoutes";
import MenuTitleUpdater from "./components/navbar/MenuTitleUpdater";
import ScrollToTop from "./components/navbar/ScrollToTop";
import TopBar from "./components/navbar/TopBar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isAuthenticated");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    localStorage.setItem("isAuthenticated","false");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MenuTitleUpdater />

      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<SignIn  handleLogin={handleLogin} onLogout={handleLogout}/> } />
        </Routes>
      ) : (
        <>
          <TopBar  onLogout={handleLogout}/>
          <AllRoutes  />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
