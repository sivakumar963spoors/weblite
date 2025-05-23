import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import CircleChecked from "@mui/icons-material/CheckCircleOutline";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  get_allCustomer,
  resetCustomerData,
  filterCustomer,
} from "../../redux/slices/CustomerModule";

const CustomerCard = ({ searchText }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isgetAllCustomerData, filteredCustomerData, getAllCustomerData } =
    useSelector((state) => state.CustomerModule);

  const navigateToCustomerDetails = ({
    id,
    CustomerChecknId,
    dayPlanId,
    selectedDate,
    navigationToCustomerDayplan
  }) => {
    navigate(
      `/customer/details/view?customerId=${id}&CustomerChecknId=${CustomerChecknId}&dayPlanId=${dayPlanId}&selectedDate=${selectedDate}&navigationToCustomerDayplan=${navigationToCustomerDayplan}`
    );
  };
  const addActivity = (id) => {
    navigate(`/customer/viewactivity/forms?customerId=${id}`);
  };
  const [searchParams] = useSearchParams();
  const viewType = searchParams.get("viewType");
  const customerView = searchParams.get("customerView");

  useEffect(() => {
    if (viewType && customerView) {
      dispatch(
        get_allCustomer({
          viewType: Number(viewType),
          customerView: Number(customerView),
        })
      );
    } else if (viewType) {
      dispatch(get_allCustomer({ viewType: Number(viewType) }));
    }
  }, [dispatch, viewType, customerView]);

  useEffect(() => {
    if (searchText && searchText.trim() !== "") {
      dispatch(filterCustomer(searchText));
    } else {
      dispatch(resetCustomerData());
    }
  }, [dispatch, searchText]);
  return (
    <div>
      <Stack sx={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
        {isgetAllCustomerData ? (
          <Typography>Loading.....</Typography>
        ) : (
          <>
            {filteredCustomerData?.length > 0 ? (
              filteredCustomerData?.map((customer) => (
                <Stack
                  key={customer.customerId}
                  sx={{
                    border: "1px solid #EEEE",
                    width: "95%",
                    borderRadius: "10px",
                  }}
                >
                  <Stack
                    sx={{ height: "auto", textTransform: "capitalize", p: 2 }}
                  >
                    <Typography
                      sx={{
                        color: "GrayText",

                        fontSize: { sm: "14px", xs: "12px" },
                      }}
                    >
                      Not checked in
                    </Typography>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: -1,
                        justifyContent: "flex-start",
                        ml: -1.5,
                        mt: -1,
                      }}
                    >
                      <Checkbox
                        icon={<CircleUnchecked />}
                        checkedIcon={<CircleChecked />}
                        defaultChecked
                        disabled
                      />
                      <Typography
                        sx={{
                          fontWeight: { sm: "bold", xs: 500 },
                          textTransform: "uppercase",
                          color: "#2375F7",
                          fontSize: { sm: "14px", xs: "12px" },
                          ml: -1,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigateToCustomerDetails({
                            id: customer.customerId,
                            CustomerChecknId: customer.customerCheckInId,
                            dayPlanId: getAllCustomerData?.dayPlanId,
                            selectedDate: getAllCustomerData?.selectedDate,
                            navigationToCustomerDayplan:
                              getAllCustomerData?.navigationToCustomerDayplan,
                          })
                        }
                      >
                        {customer.customerName}
                      </Typography>
                    </Stack>
                    <Stack sx={{ mt: 2 }}>
                      <Typography
                        sx={{
                          color: "GrayText",

                          fontSize: { sm: "14px", xs: "12px" },
                        }}
                      >
                        customer type 1
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: { sm: "bold", xs: 500 },
                          fontSize: { sm: "14px", xs: "12px" },
                        }}
                      >
                        not defined
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        mt: 2,
                        flexDirection: "row",
                        width: { xs: "80%", sm: "50%" },
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            color: "GrayText",

                            fontSize: { sm: "14px", xs: "12px" },
                          }}
                        >
                          Location
                        </Typography>
                        <Typography>
                          {customer.location !== null
                            ? customer.location
                            : "--"}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          sx={{
                            color: "GrayText",

                            fontSize: { sm: "14px", xs: "12px" },
                          }}
                        >
                          Phone
                        </Typography>

                        <Typography
                          sx={{ fontSize: { sm: "14px", xs: "10px" } }}
                        >
                          {customer.customerPhone !== null
                            ? customer.customerPhone
                            : "--"}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack sx={{ mt: 2, flexDirection: "row", gap: 1 }}>
                      <Button
                        sx={{
                          bgcolor: "#2375F7",
                          color: "#FFF",
                          textTransform: "capitalize",
                          px: 2,
                          fontSize: { sm: "14px", xs: "10px" },
                        }}
                        startIcon={
                          <DirectionsWalkIcon
                            sx={{ fontSize: { sm: "14px", xs: "10px" } }}
                          />
                        }
                      >
                        checkIn
                      </Button>
                      <Button
                        sx={{
                          border: "1px solid #2375F7",
                          color: "#2375F7",
                          textTransform: "capitalize",
                          px: 2,
                          fontSize: { sm: "14px", xs: "10px" },
                        }}
                        startIcon={
                          <AddCircleTwoToneIcon
                            sx={{ fontSize: { sm: "14px", xs: "10px" } }}
                          />
                        }
                        onClick={() => addActivity(customer.customerId)}
                      >
                        activity
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              ))
            ) : (
              <Typography style={{ color: "red", fontWeight: "bold" }}>
                No customers found
              </Typography>
            )}
          </>
        )}
      </Stack>
    </div>
  );
};

export default CustomerCard;
