import {
  Box,
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
import { theme } from "../../../styles/themes";
const PlanVsActualDetails = () => {
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
                  <TableCell>Employees </TableCell>
                  <TableCell>Planned</TableCell>
                  <TableCell>visited</TableCell>
                  <TableCell>not visited</TableCell>
                  <TableCell>unplanned visits</TableCell>
                  <TableCell>total visits</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>sukeshini</TableCell>
                  <TableCell>0.0</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PlanVsActualDetails;
