import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignInReportDetails = () => {
  const [searchParams] = useSearchParams();
  const reportType = searchParams.get("reportType");
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
              Data: 2025-03-01
            </Typography>
          </Stack>
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
                  <TableCell> Employee id</TableCell>
                  <TableCell>employee name </TableCell>
                  <TableCell>phone nymber</TableCell>
                  {reportType === "1" && <TableCell>added on</TableCell>}
                  {reportType === "2" && (
                    <>
                      <TableCell> Last Sync </TableCell>
                      <TableCell> Previous Sign In </TableCell>{" "}
                      <TableCell>Previous Sign Out</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>22ff</TableCell>
                  <TableCell>sukeshini</TableCell>
                  <TableCell>8767892161</TableCell>
                  {reportType === "1" && (
                    <TableCell>2024-09-24 06:24:12 PM</TableCell>
                  )}
                  {reportType === "2" && (
                    <>
                      <TableCell>2024-09-24 06:24:12 PM</TableCell>{" "}
                      <TableCell>2024-09-24 06:24:12 PM</TableCell>
                      <TableCell>2024-09-24 06:24:12 PM</TableCell>{" "}
                    </>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignInReportDetails;
