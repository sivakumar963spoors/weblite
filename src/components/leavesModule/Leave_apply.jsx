import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
const leavesType = ["sick", "casual"];
const LeavesDuration =['full day', 'first half','second half']
const Leave_apply = () => {
  const [fromValue, setformValue] = useState("");
  const [toValue, setToValue] = useState("");
  const handleChangesetformValue = (event) => {
    setformValue(event.target.value);
  };
  const handleChangesettoValue = (event) => {
    setToValue(event.target.value);
  };
  return (
    <Stack sx={{ mt: 9 }}>
      <Stack
        sx={{
          background: "#F0F3FA",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Stack sx={{ background: "#FFF", width: { md: "95%", xs: "99%" } }}>
          <Stack
            sx={{
              flexDirection:  "column" ,
              px: 1,
              py: 2,
              justifyContent: "space-between",
             
            }}
          >
            <Typography sx={{ width: { md: "20%", xs: "100%" } }}>
              from
            </Typography>
            <Stack
              sx={{
                border:'1px solid red',
                gap: 2,
              
                flexDirection:{md:'row', xs:'column'},
                width:'100%'
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={["DatePicker"]} sx={{width:'50%', border:'1px solid'}}>
                  <DatePicker
                    label="Please Select date"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        display: "flex",
                        alignItems: "center", // Centers text and icon
                        height: "40px", // Ensures consistent height
                        "& fieldset": {
                          borderColor: "#E5E5E5",
                        },
                        "&:hover fieldset": {
                          borderColor: "#E5E5E5",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#E5E5E5",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        height: 40,
                        overflow: "hidden",
                     
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E5E5E5 !important",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E5E5E5",
                      },
                      "& .MuiInputLabel-root": {
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: 9.5,
                        fontSize: "12px",
                        textTransform: "capitalize",
                        color:'gray'
                      },
                      "& .MuiInputLabel-shrink": {
                        top: 0,
                        left: 15,
                        transform: "translateY(-40%)",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#E5E5E5",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Autocomplete
                options={LeavesDuration.map((option) => option)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Duration" />
                )}
                sx={{
                  width: "50%",
                  "& .MuiOutlinedInput-root": {
                    display: "flex",
                    alignItems: "center", // Centers text and icon
                    height: "40px", // Ensures consistent height
                    "& fieldset": {
                      borderColor: "#E5E5E5",
                    },
                    "& .MuiOutlinedInput-root": {
                      height: 40,
                      overflow: "hidden",
                      border:'1px solid'
                    },
                    "&:hover fieldset": {
                      borderColor: "#E5E5E5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#E5E5E5",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    padding: "10px 12px", // Adjusts text padding
                    lineHeight: "normal",
                  },
                  "& .MuiAutocomplete-endAdornment": {
                    display: "flex",
                    alignItems: "center", // Centers the dropdown icon
                  },
                 "& .MuiInputLabel-root": {
                    fontSize: "12px",
                    height: "100%",
                  color:'gray',
                   marginTop:'-5px'
                  },
                  "& .MuiInputLabel-shrink": {
                    fontSize: "14px",
                    marginTop:'3px', 
                    color:'gray'
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              flexDirection: { md: "row", xs: "column" },
              px: 1,
              py: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ width: { md: "20%", xs: "100%" } }}>
              To
            </Typography>
            <Stack sx={{ width: { sm: "70%", xs: "100%" }, gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Please Select date"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        display: "flex",
                        alignItems: "center", // Centers text and icon
                        height: "40px", // Ensures consistent height
                        "& fieldset": {
                          borderColor: "#E5E5E5 !important",
                        },
                        "&:hover fieldset": {
                          borderColor: "#E5E5E5 !important",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#E5E5E5",
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E5E5E5 !important", // Prevents border change on hover/focus
                      },
                      "& .MuiOutlinedInput-root": {
                        height: 40,
                        overflow: "hidden",
                      
                      },
                     
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E5E5E5",
                      },
                      "& .MuiInputLabel-root": {
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: 9.5,
                        fontSize: "12px",
                        textTransform: "capitalize",
                        color:'gray'
                      },
                      "& .MuiInputLabel-shrink": {
                        top: 0,
                        left: 15,
                        transform: "translateY(-40%)",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#E5E5E5",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Autocomplete
                options={LeavesDuration.map((option) => option)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Duration" />
                )}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                    "& fieldset": {
                      borderColor: "#E5E5E5",
                    },
                    "&:hover fieldset": {
                      borderColor: "#E5E5E5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#E5E5E5",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    padding: "10px 12px",
                    lineHeight: "normal",
                  },
                  "& .MuiAutocomplete-endAdornment": {
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "12px",
                    height: "100%",
                  color:'gray',
                   marginTop:'-5px'
                  },
                  "& .MuiInputLabel-shrink": {
                    fontSize: "14px",
                    marginTop:'3px', 
                    color:'gray'
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              flexDirection: { md: "row", xs: "column" },
              px: 1,
              py: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ width: { md: "20%", xs: "100%" } }}>
              No of days
            </Typography>

            <Stack sx={{ width: { sm: "70%", xs: "100%" }, gap: 1 }}>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    display: "flex",
                    alignItems: "center",
                    "& fieldset": {
                      borderColor: "#E5E5E5",
                      height: "40px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#E5E5E5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#E5E5E5",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px",

                    height: "100%",
                    padding: "10px 12px",
                    lineHeight: "normal",
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              flexDirection: { md: "row", xs: "column" },
              px: 1,
              py: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ width: { md: "20%", xs: "100%" } }}>
              Leave Type
            </Typography>

            <Stack sx={{ width: { sm: "70%", xs: "100%" }, gap: 1 }}>
              <Autocomplete
                options={leavesType.map((option) => option)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Leave Type" />
                )}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                    "& fieldset": {
                      borderColor: "#E5E5E5",
                    },
                    "&:hover fieldset": {
                      borderColor: "#E5E5E5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#E5E5E5",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    padding: "10px 12px",
                    lineHeight: "normal",
                  },
                  "& .MuiAutocomplete-endAdornment": {
                    display: "flex",
                    alignItems: "center",
                  },
                 "& .MuiInputLabel-root": {
                    fontSize: "12px",
                    height: "100%",
                  color:'gray',
                   marginTop:'-5px'
                  },
                  "& .MuiInputLabel-shrink": {
                    fontSize: "14px",
                    marginTop:'3px', 
                    color:'gray'
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              flexDirection: { md: "row", xs: "column" },
              px: 1,
              py: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ width: { md: "20%", xs: "100%" } }}>
              Remark
            </Typography>

            <Stack sx={{ width: { sm: "70%", xs: "100%" }, gap: 1 }}>
              <TextField multiline rows={4}   sx={{
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
                      fontSize: "16px",
                    },
                    "& .MuiInputAdornment-root": {},
                  }}/>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          boxShadow: "2px -4px 14px -10px rgb(0 0 0 / 65%)",
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "100%",
          zIndex: 9999,
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
            zIndex: 9999,
          }}
        >
          <Button variant="outlined">cancel</Button>
          <Button variant="contained">submit </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Leave_apply;
