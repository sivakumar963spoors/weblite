import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { List } from "react-movable";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { get_emp } from "../../redux/slices/CustomerModule";
import ReusableTextfield from "../common/ReusableTextfield";
const DayPlanViewEmp = () => {
  const { filteredEmpData } = useSelector(
    (state) => state.CustomerModule
  );
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const viewType = Number(searchParam.get("viewType"));
  const customerView = Number(searchParam.get("customerView"));
  useEffect(() => {
    dispatch(get_emp({ viewType: viewType, customerView: customerView }));
  }, [dispatch, viewType, customerView]);

  return (
    <div>
      <Box sx={{}}>
        <>
          <Stack sx={{ background: "#F0F3FA" }}>
            <Stack sx={{ mt: 1, p: 1 }}>
              <ReusableTextfield
                placeholder="Search for Employee"
                icon={<SearchIcon />}
              />

              {viewType === 7 && filteredEmpData && filteredEmpData.length === 0
                ? null
                : filteredEmpData.map((employee, index) => (
                    <Stack>
                      {employee.employeeDayPlanCount !== 0 && (
                        <>
                          <List>{employee.empName}</List>
                        </>
                      )}
                    </Stack>
                  ))}
              {filteredEmpData && filteredEmpData.length === 0 ? (
                <>
                  <Stack
                    sx={{
                      background: "#FFF",
                      border: "1px solid #E3E3E3",
                      borderRadius: "4px",
                      py: 3,
                      px: { sm: 4, xs: 1 },
                      mt: 1,
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      No record found
                    </Typography>
                  </Stack>
                </>
              ) : (
                filteredEmpData.map((employee, index) => (
                  <>
                    <Stack sx={{ flexDirection: "column", gap: 1 }}>
                      {" "}
                      {
                        <Stack
                          sx={{
                            background: "#FFF",
                            border: "1px solid #E3E3E3",
                            borderRadius: "4px",
                            py: 3,
                            px: { sm: 4, xs: 1 },
                            mt: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: { sm: "bold", xs: 500 },
                              color: "#011D45",
                              textTransform: "uppercase",
                            }}
                          >
                            {employee.empName}
                          </Typography>

                          <Typography
                            sx={{
                              my: 1,
                              fontSize: { sm: "14px", xs: "10px" },
                              fontWeight: { sm: 500, xs: "bold" },
                            }}
                          >
                            EmpNo:{employee.empNo}
                          </Typography>

                          <Stack
                            sx={{
                              flexDirection: { sm: "row", xs: "column" },
                              gap: 1,
                              //alignItems: "center",
                              justifyContent: "space-between",
                              mt: 1,
                              "& > *": {
                                width: "50%",
                              },
                              "& > *>*:nth-of-type(1)": {
                                color: "#5a4f4f",
                                fontSize: { sm: "14px", xs: "10px" },
                              },
                              "& > *>*:nth-of-type(2)": {
                                fontSize: { sm: "13px", xs: "10px" },
                                fontWeight: "bold",
                              },
                            }}
                          >
                            <Stack>
                              <Typography>Email</Typography>
                              <Typography>{employee.empEmail}</Typography>
                            </Stack>
                            <Stack sx={{ textAlign: "" }}>
                              <Typography>Phone</Typography>
                              <Typography>{employee.empPhone}</Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      }
                    </Stack>
                  </>
                ))
              )}
            </Stack>
          </Stack>
        </>
      </Box>
    </div>
  );
};

export default DayPlanViewEmp;
