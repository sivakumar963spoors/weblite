import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTextfield from "../common/ReusableTextfield";
import CustomerCard from "./CustomerCard";
import { useSelector } from "react-redux";
const Customers = () => {
  const navigate = useNavigate();
  const [customerSearch, setCustomerSearch] = useState("");
  const handleChange = (event) => {
    const newValue = event.target.value.trimStart();
    setCustomerSearch(newValue);
  };
  const navigationToAddActivity = () => {
    navigate("customer/viewactivity/details");
  };
  const { isgetAllCustomerData, filteredCustomerData } = useSelector(
    (state) => state.CustomerModule
  );
  const total_customer = filteredCustomerData?.length;
  return (
    <>
      <Box sx={{ mt: 10 }}>
        <Stack sx={{ mt: 1, gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack sx={{ width: "95%" }}>
              <ReusableTextfield
                placeholder={"search by customers"}
                icon={<SearchIcon />}
                value={customerSearch}
                onChange={handleChange}
              />
              <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                Total Customer ({total_customer|| 0})
              </Typography>
            </Stack>
          </Box>

          <CustomerCard
            searchText={customerSearch}
            viewActivity={navigationToAddActivity}
          />
        </Stack>
      </Box>
    </>
  );
};

export default Customers;
