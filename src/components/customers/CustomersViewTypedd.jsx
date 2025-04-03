import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ResuableCarousal from "../common/ResuableCarousalForCustomer";
import CustomerCard from "./CustomerCard";

const CustomersViewTyped = () => {
  const { CustomerModuleMenu } = useSelector((state) => state.CustomerModule);
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [isCustomer] = useState(true);
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
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <ResuableCarousal
          items={carousalItems}
          onActiveTileChange={handleActiveTileChange}
          isCustomer={isCustomer}
        />

        <Stack sx={{ width: "100%", mt: 2 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#333",
              fontSize: { sm: "13px", xs: "10px" },
              pl: { sm: 5, xs: 2 },
            }}
          >
            {activeTile || ""}
          </Typography>
          <CustomerCard />
        </Stack>
      </Stack>
    </Box>
  );
};

export default CustomersViewTyped;
