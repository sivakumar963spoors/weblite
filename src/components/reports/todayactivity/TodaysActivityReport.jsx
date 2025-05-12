import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const TodaysActivityReport = () => {
  const { mobileReportTitle } = useSelector(
    (state) => state.MobileReportsModule
  );

  const [title] = useState(mobileReportTitle);

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
          borderRadius: "5px",
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
            pt: 4,
          }}
        >
          <Typography sx={{ textAlign: "center" }}>No data found </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TodaysActivityReport;
