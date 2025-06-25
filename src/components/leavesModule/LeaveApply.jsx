import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetAddLeaveData } from "../../redux/slices/LeavesModule";
import { globalstyle } from "../../styles/GlobalCss";
import ReusableTextfield from "../common/ReusableTextfield";
import { postleave } from "../../api/Auth";
import { useNavigate } from "react-router-dom";

const LeavesDuration = ["full day", "first half", "second half"];

const Leave_apply = () => {
  const [leaveData, setLeaveData] = useState({
    fromDate: null,
    toDate: null,
    durationFrom: null,
    durationTo: null,
    leaveType: null,
    noOfDays: "",
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [OpenDatePicker, setOpenDatePicker] = useState(false);
  const [OpenToDatePicker, setOpenToDatePicker] = useState(false);
  const { fetchgetAddLeaveDataDetails } = useSelector(
    (state) => state.LeavesModule
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchgetAddLeaveData());
  }, [dispatch]);
  const calculateDays = (startDate, endDate, startDuration, endDuration) => {
    if (!startDate || !endDate) return "";

    const start = dayjs(startDate).startOf("day");
    const end = dayjs(endDate).startOf("day");

    if (end.isBefore(start)) return "";

    let totalDays = end.diff(start, "day") + 1;

    const startDur = startDuration?.toLowerCase();
    const endDur = endDuration?.toLowerCase();

    if (
      startDur === "second half" &&
      endDur === "first half" &&
      totalDays === 1
    ) {
      totalDays = 0.5;
    } else {
      if (startDur === "second half") totalDays -= 0.5;
      if (endDur === "first half") totalDays -= 0.5;
    }

    return totalDays;
  };

  useEffect(() => {
    if (leaveData.fromDate && leaveData.toDate) {
      setLeaveData((prev) => ({
        ...prev,
        noOfDays: calculateDays(
          prev.fromDate,
          prev.toDate,
          prev.durationFrom,
          prev.durationTo
        ),
      }));
    }
  }, [
    leaveData.fromDate,
    leaveData.toDate,
    leaveData.durationFrom,
    leaveData.durationTo,
  ]);

  const handleChange = (field, value) => {
    //  alert(field)
    setLeaveData((prev) => ({
      ...prev,
      [field]: field === "remark" ? value.trimStart() : value,
    }));

    if (field === "fromDate") {
      setLeaveData((prev) => ({
        ...prev,
        toDate: value,
        durationFrom: "Full Day",
        durationTo: "Full Day",
        noOfDays: calculateDays(value, value, "Full Day", "Full Day"),
      }));
    }

    if (
      field === "toDate" &&
      dayjs(value).isBefore(dayjs(leaveData.fromDate))
    ) {
      return;
    }

    if (field === "durationFrom" || field === "durationTo") {
      setLeaveData((prev) => ({
        ...prev,
        noOfDays: calculateDays(
          prev.fromDate,
          prev.toDate,
          field === "durationFrom" ? value : prev.durationFrom,
          field === "durationTo" ? value : prev.durationTo
        ),
      }));
    }
  };

  
  const handleSubmit = async () => {
    let newErrors = {};
    const today = dayjs().startOf("day");

    if (!leaveData.fromDate) {
      newErrors.fromDate = "From date is required";
    } else if (dayjs(leaveData.fromDate).isBefore(today)) {
      newErrors.fromDate = "You can't apply for past dates";
    }

    if (!leaveData.toDate) {
      newErrors.toDate = "To date is required";
    } else if (dayjs(leaveData.toDate).isBefore(dayjs(leaveData.fromDate))) {
      newErrors.toDate = "To date cannot be before From date";
    }

    if (!leaveData.durationFrom)
      newErrors.durationFrom = "Duration is required";
    if (!leaveData.durationTo) newErrors.durationTo = "Duration is required";
    if (!leaveData.leaveType) newErrors.leaveType = "Leave type is required";
    if (!leaveData.noOfDays || leaveData.noOfDays <= 0)
      newErrors.noOfDays = "Number of days must be greater than 0";
    if (!leaveData.remark) newErrors.remark = "Remark is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new URLSearchParams();

    const fromDate = dayjs(leaveData.fromDate).format("YYYY-MM-DD");
    const toDate = dayjs(leaveData.toDate).format("YYYY-MM-DD");

    // ✅ Backend expects these flat fields (no `leave.` prefix)

    // ✅ Extra required params
    formData.append(
      "webActionToken",
      fetchgetAddLeaveDataDetails.webActionToken
    );
    formData.append("tzo", new Date().getTimezoneOffset().toString());
    formData.append("saveHidden", "");
    formData.append("myEmpId", fetchgetAddLeaveDataDetails.myEmpId);
    formData.append("empType", fetchgetAddLeaveDataDetails.empType.toString());
    formData.append("isWebLiteView", "true");
    formData.append(
      "leaveMenuType",
      fetchgetAddLeaveDataDetails.leaveMenuType || "1"
    );
        formData.append("fromDate", fromDate);
    formData.append("formDateTime", `${fromDate} 00:00:00`);
    formData.append("toDate", toDate);
    formData.append("toDateTime", `${toDate} 23:59:59`);
    formData.append("durationFrom", leaveData.durationFrom);
    formData.append("durationTo", leaveData.durationTo);
    formData.append("leaveType", leaveData.leaveType); // entityId
    formData.append("noOfDays", leaveData.noOfDays);
    formData.append("employeeNote", leaveData.remark?.trim() || "");
    formData.append("empId", fetchgetAddLeaveDataDetails.myEmpId);


    try {
      const response = await fetch(postleave, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

     navigate("/home")
      setLeaveData({
        fromDate: null,
        toDate: null,
        durationFrom: null,
        durationTo: null,
        leaveType: null,
        noOfDays: "",
        remark: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Leave submit error", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <Stack sx={{ mt: 9 }}>
      {fetchgetAddLeaveDataDetails &&
        fetchgetAddLeaveDataDetails.empType !== 2 && (
          <Stack
            sx={{
              background: "#F0F3FA",
              justifyContent: "center",
              alignItems: "center",
              pt: 1.4,
              pb: 1,
            }}
          >
            <Stack sx={{ background: "#FFF", width: { sm: "95%", xs: "99%" } }}>
              <Stack
                sx={{
                  px: 1,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: { sm: "15px", xs: "12px" } }}>
                  from
                </Typography>
                <Stack
                  sx={{
                    gap: { sm: 1, xs: 0 },
                    flexDirection: { sm: "row", xs: "column" },
                    width: "100%",
                  }}
                >
                  {(fetchgetAddLeaveDataDetails.leaveApplyMode === 1 ||
                    fetchgetAddLeaveDataDetails.leaveApplyMode === 2) && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack
                        sx={{
                          width: { sm: "50%", xs: "100%" },
                          flexDirection: "column",
                        }}
                      >
                        <DatePicker
                          value={leaveData.fromDate}
                          onChange={(newValue) =>
                            handleChange("fromDate", newValue)
                          }
                          minDate={dayjs()} // Prevent selecting past dates
                          open={OpenDatePicker}
                          onOpen={() => setOpenDatePicker(true)}
                          onClose={() => setOpenDatePicker(false)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              onClick: () => setOpenDatePicker(true),
                            },
                          }}
                          label="Please Select Date"
                          sx={globalstyle.datepicker}
                        />

                        {errors.fromDate && (
                          <Typography
                            sx={{
                              fontSize: { sm: "12px", xs: "10px" },
                              mt: 0.5,
                              pl: 2,
                              color: "tomato",
                            }}
                          >
                            {errors.fromDate}
                          </Typography>
                        )}
                      </Stack>
                    </LocalizationProvider>
                  )}

                  {fetchgetAddLeaveDataDetails.leaveApplyMode === 3 && (
                    <Stack sx={{ width: { sm: "50%", xs: "100%" } }}>
                      <Autocomplete
                        options={LeavesDuration}
                        value={leaveData.durationFrom}
                        onChange={(event, newValue) =>
                          handleChange("durationFrom", newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              "& .MuiFormHelperText-root": {
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                            }}
                            {...params}
                            label="Select Duration"
                            helperText={errors.durationFrom}
                          />
                        )}
                        sx={globalstyle.autoCompleteSelect}
                      />
                    </Stack>
                  )}
                </Stack>
              </Stack>
              <Stack
                sx={{
                  px: 1,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: { sm: "15px", xs: "12px" } }}>
                  To
                </Typography>
                <Stack
                  sx={{
                    gap: { sm: 1, xs: 0 },
                    flexDirection: { sm: "row", xs: "column" },
                    width: "100%",
                  }}
                >
                  {(fetchgetAddLeaveDataDetails.leaveApplyMode === 1 ||
                    fetchgetAddLeaveDataDetails.leaveApplyMode === 2) && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack
                        sx={{
                          width: { sm: "50%", xs: "100%" },
                          flexDirection: "column",
                        }}
                      >
                        <DatePicker
                          label="Please Select Date"
                          value={leaveData.toDate}
                          onChange={(newValue) =>
                            handleChange("toDate", newValue)
                          }
                          minDate={leaveData.fromDate || dayjs()}
                          sx={globalstyle.datepicker}
                          open={OpenToDatePicker}
                          onOpen={() => setOpenToDatePicker(true)}
                          onClose={() => setOpenToDatePicker(false)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              onClick: () => setOpenToDatePicker(true),
                            },
                          }}
                        />

                        {errors.toDate && (
                          <Typography
                            sx={{
                              fontSize: { sm: "12px", xs: "10px" },
                              mb: 0.5,
                              pl: 2,
                              color: "tomato",
                            }}
                          >
                            {errors.toDate}
                          </Typography>
                        )}
                      </Stack>
                    </LocalizationProvider>
                  )}

                  {fetchgetAddLeaveDataDetails.leaveApplyMode === 3 && (
                    <Stack sx={{ width: { sm: "50%", xs: "100%" } }}>
                      <Autocomplete
                        options={LeavesDuration}
                        value={leaveData.durationTo}
                        onChange={(event, newValue) =>
                          handleChange("durationTo", newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              "& .MuiFormHelperText-root": {
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                            }}
                            {...params}
                            label="Select Duration"
                            helperText={errors.durationTo}
                          />
                        )}
                        sx={globalstyle.autoCompleteSelect}
                      />
                    </Stack>
                  )}
                </Stack>
              </Stack>

              {(fetchgetAddLeaveDataDetails.leaveApplyMode === 3 ||
                fetchgetAddLeaveDataDetails.leaveApplyMode === 2) && (
                <Stack
                  sx={{
                    px: 1,
                    py: 1,
                  }}
                >
                  <Typography
                    sx={{ fontSize: { sm: "15px", xs: "12px" } }}
                    InputProps={{ readOnly: true }}
                  >
                    No of days
                  </Typography>

                  <Stack sx={{ width: { sm: "50%", xs: "100%" }, py: 1 }}>
                    <ReusableTextfield
                      sx={{
                        "& .MuiFormHelperText-root": {
                          fontSize: { sm: "12px", xs: "10px" },
                        },
                      }}
                      type="number"
                      value={leaveData.noOfDays}
                      helperText={errors.noOfDays}
                    />
                  </Stack>
                </Stack>
              )}
              <Stack
                sx={{
                  px: 1,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: { sm: "15px", xs: "12px" } }}>
                  Leave Type
                </Typography>

                <Stack sx={{ width: { sm: "50%", xs: "100%" }, py: 1 }}>
                  {fetchgetAddLeaveDataDetails.companyLeaveQuota &&
                    fetchgetAddLeaveDataDetails.companyLeaveQuota.length >
                      0 && (
                      <Autocomplete
                        options={fetchgetAddLeaveDataDetails.companyLeaveQuota}
                        getOptionLabel={(option) => option.leaveType || ""}
                        value={
                          fetchgetAddLeaveDataDetails.companyLeaveQuota.find(
                            (item) => item.entityId === leaveData.leaveType
                          ) || null
                        }
                        onChange={(event, newValue) =>
                          handleChange("leaveType", newValue?.entityId || "")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Leave Type"
                            helperText={errors.leaveType}
                            sx={{
                              "& .MuiFormHelperText-root": {
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                            }}
                          />
                        )}
                        sx={globalstyle.autoCompleteSelect}
                      />
                    )}
                </Stack>
              </Stack>
              <Stack
                sx={{
                  px: 1,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: { sm: "15px", xs: "12px" } }}>
                  Remark
                </Typography>

                <Stack sx={{ width: { sm: "50%", xs: "100%" } }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "1px solid #ccc",
                        },
                        "&:hover fieldset": {
                          border: "1px solid #ccc",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid #ccc",
                        },
                      },
                      "& .MuiInputBase-input": {
                        lineHeight: "1.5",
                      },
                      "& .MuiFormHelperText-root": {
                        fontSize: { sm: "12px", xs: "10px" },
                      },
                    }}
                    value={leaveData.remark}
                    onChange={(e) => handleChange("remark", e.target.value)}
                    helperText={errors.remark}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      <br></br>
      <br></br>
      <br></br>
      <Stack
        sx={{
          boxShadow: "2px -4px 14px -10px rgb(0 0 0 / 65%)",
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "100%",
          zIndex: 999,

          background: "#FFF",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            gap: 2,
            textAlign: "end",
            justifyContent: "flex-end",
            py: 1,
            px: 1,
          }}
        >
          <Button variant="outlined">cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            submit{" "}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Leave_apply;
