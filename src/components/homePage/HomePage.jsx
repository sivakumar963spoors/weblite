import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WindowIcon from "@mui/icons-material/Window";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TaskCard from '../task/TaskCard';

const HomePage = () => {
  const [userName, setUserName] = useState("vishakha");
  const [openActionRequird, setOpenActionRequird] = useState(false);
  const nav = useNavigate();
  const [zIndex, setZIndex] = useState(1000);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setZIndex(500); 
      } else {
        setZIndex(1000); 
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleActionRequird = () => {
    setOpenActionRequird(!openActionRequird);
  };
  
  const navigateToDashBoard = () => {
    nav("/dashboard");
  };
  
  return (
    <Box>
      <Box sx={{ mt: 15 }}>
        <Stack gap={1.5}>
          <Stack sx={{ position: 'relative' }}>
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                mt: -8.5,
                zIndex: zIndex
              }}
            >
              <Stack
                sx={{
                  width: "90%",
                  bgcolor: "#FFF",
                  border: "1px solid #C9C9C9",
                  borderRadius: "4px",
                }}
              >
                <Stack sx={{ px: 4, py: 2.5 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Hi, {userName}
                  </Typography>
                  <Stack sx={{ mt: 2.5, mb: 1, flexDirection: "row", gap: 1 }}>
                    <Button variant="contained">sign in</Button>
                    <Button>sign out</Button>
                  </Stack>
                  <Typography sx={{ fontSize: "10px" }}>
                    Note: system has detected mobile application access against your profile. Kindly do the sign-in through the mobile application.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              sx={{
                border: "1px solid #c9c9c9",
                width: "90%",
                bgcolor: "#FFF",
                borderRadius: "4px",
              }}
            >
              <Stack sx={{ px: 4, py: 1 }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={navigateToDashBoard}
                >
                  <IconButton sx={{ border: "1px solid #4154f1" }}>
                    <WindowIcon sx={{ color: "#4154f1" }} />
                  </IconButton>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Dashboard
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              sx={{
                border: "1px solid #c9c9c9",
                width: "90%",
                zIndex: 999,
                bgcolor: "#FFF",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: openActionRequird ? "0px" : "5px",
                borderBottomRightRadius: openActionRequird ? "0px" : "5px",
              }}
            >
              <Stack sx={{ px: 4 }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: "red",
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 600,
                      letterSpacing: 0.3,
                    }}
                  >
                    Action Required
                  </Typography>
                  <IconButton onClick={toggleActionRequird}>
                    {openActionRequird ? (
                      <KeyboardArrowDownIcon
                        sx={{ color: "red", fontSize: "30px" }}
                      />
                    ) : (
                      <KeyboardArrowRightIcon
                        sx={{ color: "red", fontSize: "30px" }}
                      />
                    )}
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>

            {openActionRequird && (
              <Stack
                sx={{
                  borderRight: "1px solid #c9c9c9",
                  width: "90%",
                  borderLeft: "1px solid #c9c9c9",
                  borderBottom: "1px solid #c9c9c9",
                }}
              >
                <Stack sx={{ px: 4, bgcolor: "#EEEEEE" }}>
                  <Typography>hi</Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TaskCard />
      </Box>
    </Box>
  );
};

export default HomePage;
