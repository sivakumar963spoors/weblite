import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import TopBar from "../navbar/TopBar";
import WindowIcon from '@mui/icons-material/Window';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const HomePage = () => {
  const [userName, setUserName] = useState("vishakha");
  return (
    <Box>
      <TopBar />

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
                  <Stack sx={{mt:2.5,mb:1, flexDirection:'row', gap:1}}>
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
            <Stack  sx={{
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
            </Stack>
            <Stack  sx={{
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
                  <Stack sx={{flexDirection:'row', gap:2, alignItems:'center', justifyContent:"space-between"}}>
                  <Typography sx={{fontWeight:'bold'}}>Action Required</Typography>
                  <IconButton ><KeyboardArrowRightIcon sx={{color:'#000'}}/></IconButton>
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
