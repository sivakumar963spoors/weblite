import { Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmpReportDetails = () => {
  const [count] = useState(10);
  const nav = useNavigate();
  const handleNavigationToFormData = () => {
    nav("");
  };
  return (
    <Stack sx={{ mt: 10 }}>
      <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
        <Stack
          sx={{
            width: { sm: "95%", xs: "99%" },
            p: 2,
            background: "#FFF",
            borderRadius: "10px",
            boxShadow:
              "0 4px 10px 0 rgb(0 0 0 / 20%), 0 4px 20px 0 rgb(0 0 0 / 19%)",
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              color: "#898282",
              fontWeight: "550",
            }}
          >
            Duration :{" "}
            <Typography
              component={"span"}
              sx={{
                color: "rgb(0 0 0 / 78%)",
                fontWeight: 550,
                fontSize: "13px",
              }}
            >
              2025-02-01 to 2025-02-19
            </Typography>
          </Typography>
          <Typography></Typography>
          <Stack sx={{ mt: 1 }}>
            <>
              <Table
                sx={{
                  minWidth: 250,
                  border: "1px solid #ddd",
                  "& .MuiTableCell-root": {
                    border: "1px solid #ddd",
                  },
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Employees</TableCell>
                    <TableCell>activity</TableCell>
                    <TableCell>count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>sukeshini</TableCell>
                    <TableCell>form</TableCell>
                    <TableCell>
                      <Stack>
                        <Typography sx={{ cursor: "pointer" }}>
                          {count}
                        </Typography>
                        {count !== 0 && (
                          <Stack>
                            <Typography
                              sx={{ color: "blue" }}
                              onClick={handleNavigationToFormData}
                            >
                              e4646
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EmpReportDetails;
