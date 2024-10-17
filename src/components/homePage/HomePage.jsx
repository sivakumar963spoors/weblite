import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TopBar from "../navbar/TopBar";
const HomePage = () => {
  const [userName, setUserName] = useState("vishakha");
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Divider />
    </Box>
  );

  return (
    <Box>
      <Box sx={{ position: "fixed" }}>
        <TopBar />
      </Box>

      <Box sx={{ mt: 15 }}>
        <Box>
          <Stack gap={1.5}>
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                mt: -3.5,
              }}
            >
              <Stack
                sx={{
                  width: "90%",
                  zIndex: 999,
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
                    Note:system has detected the Mobile application access
                    against your profile. Kindly do the Sign-in through the
                    mobile application.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            {/* <Stack  sx={{
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              
              }}>
            <Stack
                sx={{
                  border: "1px solid #c9c9c9",
                  width: "90%",
                  zIndex: 999,
                  bgcolor: "#FFF",
                  
                  borderRadius: "4px",
                }}
              >
                <Stack sx={{ px: 4, py: 2.5 }}>
                  <Stack sx={{flexDirection:'row', gap:2, alignItems:'center'}}>
                  <IconButton sx={{border:'1px solid black'}}><WindowIcon sx={{color:'#000'}}/></IconButton>
                  <Typography sx={{fontWeight:'bold'}}>Dashboard</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack> */}
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <Stack
                sx={{
                  border: "1px solid #c9c9c9",
                  width: "90%",
                  zIndex: 999,
                  bgcolor: "#FFF",

                  borderRadius: "4px",
                }}
              >
                <Stack sx={{ px: 4, py: 2.5 }}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Action Required
                    </Typography>
                    <IconButton onClick={toggleDrawer(true)}>
                      <KeyboardArrowRightIcon
                        sx={{ color: "#000", fontSize: "30px" }}
                      />
                    </IconButton>
                    <Drawer
                      open={open}
                      onClose={toggleDrawer(false)}
                      anchor="right"
                      elevation={1}
                      hideBackdrop={false}
                      transitionDuration={{ enter: 1000, exit: 900 }}
                      PaperProps={{
                        sx: {
                          backgroundColor: "lightblue",
                          padding: 2,
                          position: "absolute",
                          top: "15%",
                        },
                      }}
                      variant="temporary"
                    >
                      {DrawerList}
                    </Drawer>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
     
    </Box>
  );
};

export default HomePage;
