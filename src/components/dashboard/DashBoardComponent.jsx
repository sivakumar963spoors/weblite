import { Box } from "@mui/material";
import React from "react";
import PieChart from "../pieCharts/PieChart";

const DashBoardComponent = () => {
  return (
    <div>
      <Box sx={{ mt: 15 }}>
        <Box sx={{ border: "1px solid", width: "450px" }}>
          <PieChart />
        </Box>
      </Box>
    </div>
  );
};

export default DashBoardComponent;
