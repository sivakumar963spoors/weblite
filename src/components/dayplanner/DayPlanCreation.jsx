import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Checkbox, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTextfield from "../common/ReusableTextfield";
const DayPlanCreation = () => {
 
  const [checkboxClick, setChckBoxClick] = useState(false);
  const handleCheck = () => {
    setChckBoxClick(!checkboxClick);
  };
  const nav = useNavigate();
  const handleDayPlanCreation = () => {
    nav("/dayplanner/customers");
  };
  return (
    <Box sx={{ mt: 10 }}>
      <Stack sx={{ alignItems: "center" }}>
        <ReusableTextfield
          placeholder="search for customers"
          icon={<SearchIcon />}
          sx={{
            width: "95%",
          }}
        />
      </Stack>
      <Stack
        sx={{
          alignItems: "center",
          cursor: !checkboxClick ? "not-allowed" : "pointer",
        }}
      >
        <Stack
          sx={{
            width: "95%",
            border: " 1px solid #E3E3E3",
            borderRadius: "8px",
            background: "#FFF",
            mt: 1,
          }}
        >
          <Typography>
            <Checkbox size="small" onClick={handleCheck} />
            <Typography
              component={"span"}
              sx={{
                color: "#0560F8",
                fontWeight: "bold",
                fontSize: { sm: "14px", xs: "10px" },
              }}
            >
              Button Grouping
            </Typography>
          </Typography>
          <Stack
            sx={{
              flexDirection: "row",

              alignItems: "center",
              "&>*": {
                width: "50% !important",
                p: 1,
              },

              "& > * > :first-of-type": {
                color: "#999",
                fontWeight: 500,
                fontSize: { sm: "12px", xs: "10px" },
              },
              "& > * > :nth-of-type(2)": {
                color: "#000",
                fontWeight: 500,
                fontSize: { sm: "13px", xs: "10px" },
              },
            }}
          >
            <Stack>
              <Typography>customer type</Typography>
              <Typography>Target vs achievement</Typography>
            </Stack>
            <Stack>
              <Typography>phone</Typography>
              <Stack sx={{ flexDirection: "row", gap: 0.5 }}>
                <Typography
                  sx={{ color: "#000 ", fontSize: { sm: "14px", xs: "10px" } }}
                >
                  8722549081{" "}
                </Typography>
                <>
                  <PhoneIcon
                    sx={{
                      color: "#ffff",
                      background: "#0560F8",
                      fontSize: "14px",
                      borderRadius: "3px",
                      p: 0.2,
                      fontWeight: "bold",
                    }}
                  />
                </>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              flexDirection: { sm: "row", xs: "column" },
              py: 1,
              "&>*": {
                width: "50% !important",
                p: 1,
              },

              "& > * > :first-of-type": {
                color: "#999",
                fontWeight: 500,
                fontSize: { sm: "12px", xs: "10px" },
              },
              "& > * > :nth-of-type(2)": {
                color: "#000",
                fontWeight: 500,
                fontSize: { sm: "13px", xs: "10px" },
              },
            }}
          >
            <Stack>
              <Typography>Form :</Typography>
              <TextField
  disabled={!checkboxClick}
  sx={{
    background: !checkboxClick ? "#eee" : "transparent",
    borderRadius: "5px",
    "& .MuiOutlinedInput-root": {
      height: "40px",
      border: !checkboxClick ? "none" : "1px solid #eee", // Remove border if disabled
      "& fieldset": {
        border: !checkboxClick ? "none" : "1px solid #eee", // Remove fieldset border when disabled
      },
      "&:hover fieldset": {
        border: !checkboxClick ? "none" : "1px solid #eee",
        cursor: !checkboxClick ? "not-allowed" : "pointer",
      },
      "&.Mui-focused fieldset": {
        border: !checkboxClick ? "none" : "1px solid #eee",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: { sm: "14px ", xs: "12px" },
      cursor: !checkboxClick ? "not-allowed" : "pointer",
    },
  }}
/>

            </Stack>
            <Stack>
              <Typography>To :</Typography>
              <TextField
  disabled={!checkboxClick}
  sx={{
    background: !checkboxClick ? "#eee" : "transparent",
    borderRadius: "5px",
    "& .MuiOutlinedInput-root": {
      height: "40px",
      border: !checkboxClick ? "none" : "1px solid #eee", // Remove border if disabled
      "& fieldset": {
        border: !checkboxClick ? "none" : "1px solid #eee", // Remove fieldset border when disabled
      },
      "&:hover fieldset": {
        border: !checkboxClick ? "none" : "1px solid #eee",
        cursor: !checkboxClick ? "not-allowed" : "pointer",
      },
      "&.Mui-focused fieldset": {
        border: !checkboxClick ? "none" : "1px solid #eee",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: { sm: "14px ", xs: "12px" },
      cursor: !checkboxClick ? "not-allowed" : "pointer",
    },
  }}
/>

            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          position: "fixed",
          background: "#2478FE",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          py: 3,
          cursor: "pointer",
        }}
        onClick={handleDayPlanCreation}
      >
        <Typography sx={{ color: "#fff" }}>Create day paln</Typography>
      </Stack>
    </Box>
  );
};

export default DayPlanCreation;
