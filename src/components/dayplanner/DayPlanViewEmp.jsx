import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ReusableCarousalDayPlan from "../common/ReusableCarousalDayPlan";
import ReusableTextfield from "../common/ReusableTextfield";
const DayPlanViewEmp = () => {
  const { DayPlanModuleMenu, menuItem } = useSelector(
    (state) => state.DayPlannerModule
  );
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [activeTile, setActiveTile] = useState(
    localStorage.getItem("activeMenuTitle") || menuItem
  );
  const [searchParam] = useSearchParams();
  const viewType = Number(searchParam.get("viewType")) || 0;
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
    <div>
      <Box sx={{ mt: 12 }}>
        <Box sx={{ mt: 10 }}>
          <ReusableCarousalDayPlan items={carousalItems} />
          <Stack sx={{ background: "#F0F3FA" }}>
            <Stack sx={{ mt: 1, p: 1 }}>
              <ReusableTextfield
                placeholder="Search for Employee"
                icon={<SearchIcon />}
              />

              <Typography
                sx={{
                  mt: 1,
                  fontSize: "12px",
                  fontWeight: { sm: 600, xs: 500 },
                }}
              >
                {activeTile}
              </Typography>
              {viewType === 7 && <Stack sx={{
                    background: "#FFF",
                    border: "1px solid #E3E3E3",
                    borderRadius: "4px",
                    py: 3,
                    px: { sm: 4, xs: 1 },
                    mt:1
                  }}>
                    <Typography sx={{textAlign:'center'}}>No record found</Typography>

                
                </Stack>}
              {viewType === 8 && (
                <Stack
                  sx={{
                    background: "#FFF",
                    border: "1px solid #E3E3E3",
                    borderRadius: "4px",
                    py: 3,
                    px: { sm: 4, xs: 1 },
                    mt:1
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: {sm:"bold",xs:500},
                      color: "#011D45",
                      textTransform: "uppercase",
                    }}
                  >
                    kiran devarkonda
                  </Typography>

                  <Typography sx={{ my: 1,  fontSize:{sm:'14px', xs:'10px'}, fontWeight:{sm:500,xs:'bold'} }}>EmpNo:1000</Typography>

                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt:1,
                      "& > *": {
                        width: "50%",
                      },
                      "& > *>*:nth-of-type(1)": {
                        color: "#5a4f4f", 
                        fontSize:{sm:'14px', xs:'10px'}
                      },
                      "& > *>*:nth-of-type(2)": {
                        
                        fontSize:{sm:'13px', xs:'10px'}, 
                        fontWeight:'bold'
                      },
                    }}
                  >
                    <Stack>
                      <Typography>Email</Typography>
                      <Typography>abc@gmail.com</Typography>
                    </Stack>
                    <Stack sx={{ textAlign: "" }}>
                      <Typography>Phone</Typography>
                      <Typography>8767892161</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default DayPlanViewEmp;
