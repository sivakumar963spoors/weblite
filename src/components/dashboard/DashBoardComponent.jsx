import { Box } from "@mui/material";
import React from "react";
import PieChart from "../pieCharts/PieChart";

const DashBoardComponent = () => {
  return (
    <div>
      <Box sx={{ mt: 10 }}>
        <Box sx={{ border: "", width: {md:'450px', sm:'350px',xs:'310px'} }}>
          <PieChart />
        </Box>
      </Box>
    </div>
  );
};

export default DashBoardComponent;
