import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const Leaves_details = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Stack sx={{ alignItems: "center" }}>
        <Stack
          sx={{
            width: "85%",
            borderRadius: "10px",
            boxShadow: "0 0 25px rgb(23 23 23 / 11%)",
            px: 2,
          }}
        >
          <Typography sx={{ color: "#244f64", fontWeight: "bold", my: 2 }}>
            Leave Deatils
          </Typography>
          <Stack
            sx={{
              "& > *": {
                flexDirection: { md: "row", sm: "column" },
              },
              "& > * > :first-of-type": {
                width: { md: "50%", xs: "100%" },

                fontSize: "12px",
                fontWeight: 400,
                color: "#0D3443", // Applies color only to the first Typography inside each Stack
              },
              "& > * > :nth-of-type(2)": {
                mb: 1,
                width: { md: "50%", xs: "100%" },
                fontSize: "14px",
                color: "#333", // Applies color only to the second Typography inside each Stack
              },
            }}
          >
            <Stack sx={{ flexDirection: { md: "row", sm: "column" } }}>
              <Typography>Employee :</Typography>
              <Typography>kishore kutaplaii</Typography>
            </Stack>
            <Stack>
              <Typography>Applied on :</Typography>
              <Typography>12/10/1999</Typography>
            </Stack>{" "}
            <Stack>
              <Typography> from :</Typography>
              <Typography></Typography>
            </Stack>{" "}
            <Stack>
              <Typography>To :</Typography>
              <Typography></Typography>
            </Stack>{" "}
            <Stack>
              <Typography> leave type :</Typography>
              <Typography></Typography>
            </Stack>{" "}
            <Stack>
              <Typography>actual quota</Typography>
              <Typography></Typography>
            </Stack>
            <Stack>
              <Typography>present available quota</Typography>
              <Typography></Typography>
            </Stack>
            <Stack>
              <Typography>available quota during leave applied</Typography>
              <Typography></Typography>
            </Stack>
            <Stack>
              <Typography>total days</Typography>
              <Typography></Typography>
            </Stack>
            <Stack>
              <Typography>status</Typography>
              <Typography></Typography>
            </Stack>
            <Stack>
              <Typography>Employee kiran remark</Typography>
              <TextField multiline rows={3} />
            </Stack>
            <Stack>
              <Typography>manager remark</Typography>
              <TextField multiline rows={3} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#fff",
          zIndex: 9999,
          boxShadow: "2px -4px 14px -10px rgb(0 0 0 / 65%)",
        }}
      >
        <Stack
          sx={{
            alignContent: "flex-end",
            alignItems: "flex-end",
            my: 2,
            mr: 2,
          }}
        >
          {" "}
          <Button variant="contained" sx={{ width: "100px" }}>
            ok
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Leaves_details;
