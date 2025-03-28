import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReusableCarousalDayPlan from "../common/ReusableCarousalDayPlan";
import ReusableTextfield from "../common/ReusableTextfield";

const DayPlanViewCustomer = () => {
  const { DayPlanModuleMenu, menuItem } = useSelector((state) => state.DayPlannerModule);

 
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [activeTile, setActiveTile] = useState(localStorage.getItem("activeMenuTitle") || menuItem);

  const calculateItemsPerRow = () => {
    const width = window.innerWidth;
    if (width >= 1440) {
      setItemsPerRow(4);
    } else if (width >= 768) {
      setItemsPerRow(3);
    } else {
      setItemsPerRow(2);
    }
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const carousalItems = chunkArray(DayPlanModuleMenu, itemsPerRow);

  useEffect(() => {
   
    calculateItemsPerRow();
    window.addEventListener("resize", calculateItemsPerRow);
    return () => {
      window.removeEventListener("resize", calculateItemsPerRow);
    };
  }, []);

 
  useEffect(() => {
    if (menuItem) {
      setActiveTile(menuItem);
      localStorage.setItem("activeMenuTitle", menuItem);
    }
  }, [menuItem]);


  return (
    <Box sx={{ mt: 10 }}>
      <ReusableCarousalDayPlan items={carousalItems} />
      <Stack sx={{ mt: 1, p: 1 }}>
        <ReusableTextfield placeholder="Search for customer" icon={<SearchIcon />} />
         <Typography sx={{mt:1, fontSize:'12px',fontWeight:{sm:600, xs:500}}}>{activeTile}</Typography>
        

      </Stack>
    </Box>
  );
};

export default DayPlanViewCustomer;
