import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const arrayList = [
  "111",
  "11qwdsdc",
  "qwsxawx",
  "wqswwaea",
  "2wsaw",
  "edadcescse",
  "ewdwaca",
];

const ViewDeatilsActivity = () => {
    const nav =useNavigate();
    const handleOnClickgetForm =()=>{
nav('/getForm');
    }
  return (
    <div>
      <Box sx={{ mt: 9, background: "#F0F3FA" }}>
        <Stack
          sx={{
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Stack
            sx={{
              width: "95%",
              backgroundColor: "#FFF",
              borderRadius: "5px",
              flexDirection: "row",
              justifyContent: "space-between",
              py: 1,
              px: 1,
              marginTop: -1,
              zIndex: 100000,
              border: "1px solid #C9C9C9",
              "& > *": { fontSize: "11px" },
              position: "fixed",
            }}
          >
            <Typography>complete Mahindra activity</Typography>
          </Stack>
          <Stack
            sx={{
              width: "97%",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "space-between",
              mt: 5,
            }}
          >
            {arrayList.map((each, i) => (
              <Stack
                key={i}
                sx={{
                  width: "calc(50% - 8px)",
                  alignItems: "center",
                  background: "#FFF",
                  py: 1,
                  borderRadius: "5px",
                  py: 4,
                }}
              >
                <Button startIcon={<AddCircleOutlineIcon />} variant="outlined"   onClick={handleOnClickgetForm}
>                 Add
                </Button>
                <Typography sx={{mt:2,textTransform:'capitalize'}}
                >{each}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default ViewDeatilsActivity;
