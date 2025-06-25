import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ResuableCarousal from "../common/ResuableCarousalForCustomer";
import DayplanViewEmp from "../dayplanner/DayPlanViewEmp";
import CustomerCard from "./CustomerCard";
const CustomersViewTyped = () => {
  const {
    CustomerModuleMenu,
    customerViewTypeTitle,
    
    customerViewForTwoType,
  } = useSelector((state) => state.CustomerModule);
  const [searchParams] = useSearchParams();
  const viewType = Number(searchParams.get("viewType"));
  const customerView = Number(searchParams.get("customerView"));
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
  const carousalItems = useMemo(() => {
    return CustomerModuleMenu
      ? chunkArray(CustomerModuleMenu, itemsPerRow)
      : [];
  }, [CustomerModuleMenu, itemsPerRow]);

  const carousalItemsForTwo = useMemo(() => {
    return customerViewForTwoType
      ? chunkArray(customerViewForTwoType, itemsPerRow)
      : [];
  }, [customerViewForTwoType, itemsPerRow]);

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
        sx={{ position: "absolute", mt: -7, zIndex: 99999999, ml: "50px" }}
      >
        <Typography sx={{ color: "#FFF" }}>
          {(viewType === 7 || viewType === 8) && customerView === 2
            ? "employee"
            : "customer"}
        </Typography>
      </Stack>
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        {customerView === 1 && <ResuableCarousal items={carousalItems} />}
        {customerView === 2 && <ResuableCarousal items={carousalItemsForTwo} />}

        <Stack sx={{ width: "100%", mt: 3, mb: 2 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#333",
              fontSize: { sm: "13px", xs: "10px" },
              pl: { sm: 5, xs: 2 },
              mb: 1,
            }}
          >
            {customerViewTypeTitle || ""}
          </Typography>

          {(viewType === 7 || viewType === 8) && customerView === 2 ? (
            <DayplanViewEmp />
          ) : (
            <CustomerCard />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CustomersViewTyped;
