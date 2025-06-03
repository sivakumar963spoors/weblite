import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_allCustomer } from "../../redux/slices/CustomerModule";
import ResuableCarousal from "../common/ResuableCarousalForCustomer";
import CustomerCard from "./CustomerCard";

const CustomersViewTyped = () => {
  const { CustomerModuleMenu, customerViewTypeTitle, filteredCustomerData } =
    useSelector((state) => state.CustomerModule);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [itemsPerRow, setItemsPerRow] = useState(3);
  useEffect(() => {
    dispatch(get_allCustomer());
  }, [dispatch]);
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

  return (
    <Box sx={{ mt: 10, position: "relative" }}>
      <Stack
        sx={{ position: "absolute", mt: -7, zIndex: 99999999, ml: "135px" }}
      >
        <Typography sx={{color:'#FFF'}}>({filteredCustomerData?.length})</Typography>
      </Stack>
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <ResuableCarousal items={carousalItems} />

        <Stack sx={{ width: "100%", mt: 3, mb:2 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#333",
              fontSize: { sm: "13px", xs: "10px" },
              pl: { sm: 5, xs: 2 },
              mb:1
            }}
          >
            {customerViewTypeTitle || ""}
          </Typography>
          <CustomerCard />
        </Stack>
      </Stack>
    </Box>
  );
};

export default CustomersViewTyped;
