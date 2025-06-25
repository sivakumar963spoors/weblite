import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import SignIn from "./components/credentials/login/SignIn";
import AllRoutes from "./components/navbar/AllRoutes";
import MenuTitleUpdater from "./components/navbar/MenuTitleUpdater";
import ScrollToTop from "./components/navbar/ScrollToTop";
import TopBar from "./components/navbar/TopBar";
import { get_logout, loggedInUser_ajax } from "./api/Auth";
import { Stack, Typography } from "@mui/material";
import DottedSpinner from "./components/common/DottedSpinner";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true); // Prevents early rendering

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(loggedInUser_ajax(), {
          method: "GET",
          credentials: "include", // send cookies
        });

        if (res.ok) {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
        } else {
          setIsAuthenticated(false);
          localStorage.setItem("isAuthenticated", "false");
        }
      } catch (error) {
    
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", "false");
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    localStorage.setItem("isAuthenticated", "false");

    try {
      await fetch(get_logout, {
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setIsAuthenticated(false);
  };

  if (checkingSession) {
    return <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
            mt: 10,
            flexDirection: "row",
          }}
        >
          <Typography>Loading ....</Typography>
          <DottedSpinner size={20} color="#1976d2" thickness={4} />
        </Stack>
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MenuTitleUpdater />

      {!isAuthenticated ? (
        <Routes>
          <Route
            path="/"
            element={
              <SignIn handleLogin={handleLogin} onLogout={handleLogout} />
            }
          />
        </Routes>
      ) : (
        <>
          <TopBar onLogout={handleLogout} />
          <AllRoutes />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
