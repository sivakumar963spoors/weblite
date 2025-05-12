import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../styles/themes";

const DistanceReportDetails = () => {
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
          <Stack>
            <Typography sx={{ fontWeight: "550", fontSize: "11px" }}>
              From: 2025-03-01
            </Typography>
            <Typography sx={{ fontWeight: "550", fontSize: "11px" }}>
              to: 2025-03-01
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: "10px", fontWeight: "400" }}>
            Distance Calculation Method :
            <Typography
              component={"span"}
              sx={{ fontSize: "10px", color: theme.palette.primary.main }}
            >
              Straight-Line (Aerial). To minimize the variance between actual
              and reported distance, update the setting to Snap to Road. Please
              contact your Spoors Customer Success Manager (CSM) or Support
              team.
            </Typography>
          </Typography>
          <TableContainer
            sx={{
              overflowX: "auto",
            }}
          >
            <Table
              sx={{
                minWidth: 1090,
                border: "1px solid #ddd",
                "& .MuiTableCell-root": {
                  border: "1px solid #ddd",
                },
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Employees Name</TableCell>
                  <TableCell>Distance Traveled (KM)</TableCell>
                  <TableCell>No. of Unsynced tracks as of now</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>sukeshini</TableCell>
                  <TableCell>0.0</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DistanceReportDetails;
