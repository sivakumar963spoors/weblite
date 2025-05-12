import {
  Box,
  Button,
  Stack,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmpWiseActivityDetails = () => {
  const { mobileReportTitle } = useSelector(
    (state) => state.MobileReportsModule
  );

  const [title] = useState(mobileReportTitle);
  const nav = useNavigate();
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          background: "#FFF",
          boxShadow: "rgb(100 100 100 / 20%) 0px 0px 11px 0px",
          width: { sm: "95%", xs: "310px" },
          mt: 5,
          borderRadius: "15px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            py: 2,
            background: "blue",
            color: "#fff",
            borderStartEndRadius: "5px",
            borderStartStartRadius: "5px",
            fontSize: { sm: "12px", xs: "10px", fontWeight: "550" },
          }}
        >
          {title}
        </Typography>
        <Stack
          sx={{
            gap: 1.5,
            px: 1,
            pb: 7,
            pt: 3,
          }}
        >
          <Stack sx={{ alignItems: "end" }}>
            <Button variant="outlined">send email as xls</Button>
          </Stack>
          <Stack>
            <Typography sx={{ fontWeight: "550", fontSize: "11px" }}>
              From: 2025-03-01 to to: 2025-03-01
            </Typography>
            <Typography sx={{ fontWeight: "550", fontSize: "11px" }}>
              Empoyee Name : vijaya
            </Typography>
          </Stack>
          <Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                borderTop: "1px solid #ddd",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Typography>total checkins</Typography>
              <Typography>0</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmpWiseActivityDetails;
