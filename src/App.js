import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AllRoutes from "./components/navbar/AllRoutes";
import MenuTitleUpdater from "./components/navbar/MenuTitleUpdater";
import ScrollToTop from "./components/navbar/ScrollToTop";
import TopBar from "./components/navbar/TopBar";
import SignIn from "./components/credentials/login/SignIn";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const loggedIn = localStorage.getItem("isAuthenticated");
    if (loggedIn === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MenuTitleUpdater />

      {!isAuthenticated ? (
        <SignIn onLogin={handleLogin} />
      ) : (
        <>
          <TopBar />
          <AllRoutes />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
