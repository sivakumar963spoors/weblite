import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReusableTextfield from "../common/ReusableTextfield";
import SearchIcon from "@mui/icons-material/Search";
const ViewForms = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Stack sx={{ width: "95%", gap: 1 }}>
          <Typography
            sx={{
              fontSize: { sm: "12px", xs: "10px" },
              fontWeight: 500,
              ml: 0.7,
            }}
          >
            Note: Past 10 Day's Of Forms Data Are Displayed From Current Date
          </Typography>

          <Stack
            sx={{
              width: "100%",
              background: "#fff",
              border: "1px solid #E3E3E3",
              borderRadius: "10px",
            }}
          >
            <Stack
              sx={{
                py: 2,
                px: 1,
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  gap: 2,
                  "& > *": { alignItems: "center !important" },
                  "& > * > :nth-of-type(2)": {
                    flexShrink: 0,
                    color: "blue",
                    fontWeight: "bold",
                    fontSize: { sm: "14px", xs: "10px" },
                    cursor: "pointer",
                  },
                  "& > * > :nth-of-type(3)": {
                    flexShrink: 0,
                    color: "#333",
                    textTransform: "uppercase",
                    fontSize: { sm: "12px", xs: "8px" },
                    textAlign: "center",
                  },
                }}
              >
                <Stack>
                  <Typography>
                    <AssignmentIcon
                      sx={{
                        fontSize: "15px",
                        background: "#FFF8E5",
                        borderRadius: "100%",
                        p: 0.3,
                        color: "#FFCB1D",
                      }}
                    />
                  </Typography>
                  <Typography>0</Typography>
                  <Typography
                    sx={
                      {
                        // textDecoration: active == viewType ? "underline" : "none",
                        //color:active == viewType ? "orange !important ":'#000'
                      }
                    }
                  >
                    filled today
                  </Typography>
                </Stack>
                <Stack>
                  <Typography>
                    <AssignmentIcon
                      sx={{
                        fontSize: "15px",
                        background: "#FFF8E5",
                        borderRadius: "100%",
                        p: 0.3,
                        color: "#FFCB1D",
                      }}
                    />
                  </Typography>
                  <Typography>0</Typography>
                  <Typography
                    sx={
                      {
                        // textDecoration: active == viewType ? "underline" : "none",
                        //color:active == viewType ? "orange !important ":'#000'
                      }
                    }
                  >
                    filled Yestarday
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{}}>
            <ReusableTextfield
              placeholder="search by identifier"
              icon={<SearchIcon />}
            />
          </Stack>
          <Stack>
            <Typography sx={{ textAlign: "center" }}>No data found</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ position: "fixed", bottom: 10, right: 10 }}>
        <Button
          startIcon={<AddCircleOutlineIcon sx={{}} />}
          sx={{
            borderRadius: "30px",
            background: "#2478FE",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: { md: "13px", xs: "10px" },
          }}
          variant="outlined"
        >
          submit form
        </Button>
      </Stack>
    </Box>
  );
};

export default ViewForms;
