import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { get_customerActivityForms } from "../../../redux/slices/CustomerModule";

const ViewDeatilsActivity = () => {
  const [searchParams] = useSearchParams();
  const customerId = Number(searchParams.get("customerId"));
  const dayPlanId = Number(searchParams.get("dayPlanId"));
  const { get_customerActivityForms_data, isget_customerActivityForms } =
    useSelector((state) => state.CustomerModule);
  const dispatch = useDispatch();
  useEffect(() => {
    if (customerId) {
      dispatch(
        get_customerActivityForms({
          customerId,
          dayPlanId,
        })
      );
    }
  }, []);
  const nav = useNavigate();
  const handleOnClickgetForm = () => {
    nav("/add/form/100");
  };
  return (
    <div>
      <Box sx={{ mt: 9, background: "#F0F3FA" }}>
        <Stack
          sx={{
            alignItems: "center",
            height: "100vh",
          }}
        >
          {isget_customerActivityForms ? (
            <Typography>Loading data ...</Typography>
          ) : (
            <>
              {get_customerActivityForms_data && (
                <Stack
                  sx={{
                    width: "95%",
                    backgroundColor: "#FFF",
                    borderRadius: "5px",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    py: 1,
                    px: 1,
                    marginTop: -2,
                    zIndex: 1000,
                    border: "1px solid #C9C9C9",
                    "& > *": {
                      fontSize: { sm: "14px", xs: "12px" },
                      fontWeight: { sm: 600, xs: 500 },
                    },
                    position: "fixed",
                  }}
                >
                  <Typography>
                    complete{" "}
                    {get_customerActivityForms_data?.customer?.customerName}{" "}
                    activity
                  </Typography>
                </Stack>
              )}
              <Stack
                sx={{
                  width: "97%",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: "space-between",
                  mt: 5,
                }}
              >
                {get_customerActivityForms_data?.formSpecs?.length > 0 ? (
                  <>
                    {get_customerActivityForms_data?.formSpecs?.map(
                      (each, i) => (
                        <Stack
                          key={i}
                          sx={{
                            width: "calc(50% - 8px)",
                            alignItems: "center",
                            background: "#FFF",
                            py: 4,
                            borderRadius: "5px",
                          }}
                        >
                          <Button
                            startIcon={
                              <AddCircleOutlineIcon
                                sx={{ fontSize: { sm: "14px", xs: "12px" } }}
                              />
                            }
                            variant="outlined"
                            onClick={handleOnClickgetForm}
                            sx={{ fontSize: { sm: "14px", xs: "12px" } }}
                          >
                            Add
                          </Button>
                          <Typography
                            sx={{
                              mt: 2,
                              textTransform: "capitalize",
                              fontSize: { sm: "14px", xs: "12px" },
                              fontWeight: { sm: 500, xs: 500 },
                            }}
                          >
                            {each.formTitle}
                          </Typography>
                        </Stack>
                      )
                    )}
                  </>
                ) : (
                  <Stack
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{ alignItems: "center", textAlign: "center" }}
                    >
                      No data found
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default ViewDeatilsActivity;
