import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ResuableCarousal from "../common/ResuableCarousalForCustomer";
import ReusableTextfield from "../common/ReusableTextfield";
import SearchIcon from "@mui/icons-material/Search";
const ViewFormNew = () => {
  const { CustomerModuleMenu } = useSelector((state) => state.CustomerModule);
  const [itemsPerRow, setItemsPerRow] = useState(3);
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

  const carousalItems = chunkArray(CustomerModuleMenu, itemsPerRow);

  useEffect(() => {
    calculateItemsPerRow();
    window.addEventListener("resize", calculateItemsPerRow);

    return () => {
      window.removeEventListener("resize", calculateItemsPerRow);
    };
  }, []);
  const [activeTile, setActiveTile] = useState("");
  useEffect(() => {
    const storedTitle = localStorage.getItem("activeTile");
    if (storedTitle) {
      setActiveTile(storedTitle);
    }
  }, []);

  const handleActiveTileChange = (title) => {
    localStorage.setItem("activeTile", title);
    setActiveTile(title);
  };

  return (
    <Box sx={{ mt: 10 }}>
      <ResuableCarousal
        items={carousalItems}
        onActiveTileChange={handleActiveTileChange}
        isForm={true}
      />
      <Stack sx={{ mt: 1.5, px: { sm: 1.5, xs: 1 } }}>
          <Typography
                  sx={{
                    color: "#FFF",
        
                    fontSize: { sm: 20, xs: 15 },
                    fontWeight: { sm: 500, xs: 400 },
                    position: "absolute",
                    top: { sm: 17, xs: 20 },
                    zIndex: 9999,
                    left: 55,
                  }}
                >
               customer
                information
                </Typography>
        <ReusableTextfield
          placeholder="search by identifier"
          icon={<SearchIcon />}
        />
        <Typography
          sx={{   
            mt: 1,
            fontWeight: "bold",
            color: "#333",
            fontSize: { sm: "13px", xs: "10px" },
          }}
        >
          {activeTile}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ViewFormNew;
