import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const KnowledgeBaseAll = () => {
  return (
    <div>
      <Box sx={{ mt: 10 }}>
        <Stack sx={{ width: "100%", alignItems: "center" }}>
          <Stack sx={{ width: { sm: "85%", xs: "100%" } }}>
            <Stack
              sx={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 1,
                " & > *": {
                  width: { sm: "30%", xs: "100%" },
                  border: "1px solid transparent",
                  borderColor: "#DDD",
                  background: "#fff",
                  boxShadow: "0 1px 10px rgba(0,0,0,.05)",
                  borderRadius: "5px",
                  py: 1,
                  px: 1,
                },
                "& > * > *": {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly", 
                  
                },
          
                "& > * button": {
                  borderColor: "red",
                  color: "red",
                  width: "100px",
                  mt: 1,
                  textAlign: "center !important",
                  alignItems: "center !important",
                },
                
              }}
            >
              <Stack>
                <Typography>others</Typography>
                <Stack sx={{ flexDirection: "row" }}>
                  <Typography>10</Typography>
                  <Typography>20</Typography>
                </Stack>
                <Button variant="outlined">New</Button>
              </Stack>
              <Stack>
                <Typography>others</Typography>
                <Stack>
                  <Typography>10</Typography>
                  <Typography>20</Typography>
                </Stack>
                <Button variant="outlined">New</Button>
              </Stack>{" "}
              <Stack>
                <Typography>others</Typography>
                <Stack>
                  <Typography>10</Typography>
                  <Typography>20</Typography>
                </Stack>
              </Stack>{" "}
              <Stack>
                <Typography>others</Typography>
                <Stack>
                  <Typography>10</Typography>
                  <Typography>20</Typography>
                </Stack>
              </Stack>{" "}
              <Stack>
                <Typography>others</Typography>
                <Stack>
                  <Typography>10</Typography>
                  <Typography>20</Typography>
                </Stack>
              </Stack>{" "}
              <Stack>
                <Typography>others</Typography>
                <Stack>
                  <Typography>10</Typography>
                  <Typography>20</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default KnowledgeBaseAll;
