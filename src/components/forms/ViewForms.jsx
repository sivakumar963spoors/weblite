import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ReusableTextfield from "../common/ReusableTextfield";
const ViewForms = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(() => {
    return parseInt(localStorage.getItem("activeViewForms")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("activeViewForms", active);
    return () => {
      localStorage.removeItem("activeViewForms");
    };
  }, [active]);

  const handleViewType = (view) => {
    setActive(view);
    navigate(`/view/forms?empId=136947&formSpecId=245583&viewType=${view}`);
  };
  return (
    <Box sx={{ mt: 8 }}>
      <Stack sx={{ background: "", py: 1.5 }}>
        <Typography
          sx={{
            color: "#FFF",
           
            fontSize: { sm: 20, xs: 20 },
            fontWeight: { sm: 500, xs: 400 },
            position:'absolute', top:17, zIndex:9999,  left:50
          }}
        >
          Simple form
        </Typography>
      </Stack>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Stack sx={{ width: "95%", gap: 1 }}>
          <Typography
            sx={{
              fontSize: { sm: "12px", xs: "10px" },
              fontWeight: 400,
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
                  <Typography onClick={() => handleViewType(101)}>0</Typography>
                  <Typography
                    sx={{
                      textDecoration: active === 101 ? "underline" : "none",
                      color: active === 101 ? "orange !important " : "#000",
                    }}
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
                  <Typography onClick={() => handleViewType(102)}>0</Typography>
                  <Typography
                    sx={{
                      textDecoration: active === 102 ? "underline" : "none",
                      color: active === 102 ? "orange !important " : "#000",
                    }}
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
          {active !== 101 && active !== 102 && (
            <Stack>
              <Typography
                sx={{ textAlign: "center", fontSize: { xs: 12, sm: 14 } }}
              >
                No data found
              </Typography>
            </Stack>
          )}
          {active === 101 && (
            <Stack>
              <Typography
                sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 500 }}
              >
                filled today
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: { xs: 12, sm: 14 },
                  py: 1.5,
                  background: "#fff",
                  mt: 1,
                  border: "1px solid #EBEBEB",
                }}
              >
                No data found
              </Typography>
            </Stack>
          )}
          {active === 102 && (
            <Stack>
              <Typography
                sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 500 }}
              >
                filled yestarday
              </Typography>
              <Stack sx={{ background: "#FFF", mt: 1 }}>
                <Stack
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    px: 1,
                    py: 2,
                  }}
                >
                  <Stack
                    sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}
                  >
                    <Typography>
                      <DescriptionIcon sx={{ color: "gray",  }} />
                    </Typography>
                    <Stack sx={{cursor:'pointer'}}>
                      <Typography sx={{ fontSize: "12px", color:'#000' }}>13882</Typography>
                      <Typography sx={{ fontSize: "10px", color:'#2e2e2e' }}>
                        APril 2,2025 | Root user
                      </Typography>
                    </Stack>
                  </Stack>
                  <>
                    <EditIcon sx={{ color: "gray",fontSize:'20px' , cursor:'pointer'}} />
                  </>
                </Stack>
              </Stack>
            </Stack>
          )}
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
