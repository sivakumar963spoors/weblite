import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { createTheme } from "@mui/material";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    allVariants: {
      fontFamily: '"Poppins", sans-serif !important',
      textTransform: "capitalize",
      lineHeight: "1.42857143",
      fontSize: "13px",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiDatePicker: {
      defaultProps: {
        slots: {
          openPickerIcon: CalendarMonthIcon,
        },
        slotProps: {
          openPickerButton: {
            sx: {
              color: "#F06E70",
            },
          },
          popper: {
            sx: {
              "& .MuiPaper-root": {
                width: {
                  xs: "300px",
                  sm: "auto",
                },
                maxWidth: "95vw", // Make sure it doesn't overflow screen
                overflow: "hidden",
              },
            },
          },
        },

        desktopModeMediaQuery: "(min-width: 0px)",
      },
    },
    MuiDateTimePicker: {
      defaultProps: {
        slots: {
          openPickerIcon: CalendarMonthIcon,
        },
        slotProps: {
          openPickerButton: {
            sx: { color: "#F06E70 !important" },
          },
        },
        desktopModeMediaQuery: "(min-width: 0px)",
      },
    },
    MuiTimePicker: {
      defaultProps: {
        slotProps: {
          openPickerButton: {
            sx: { color: "#F06E70 !important" },
          },
        },
        desktopModeMediaQuery: "(min-width: 0px)",
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          overflowX: "hidden",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "tomato", // Set helper text color globally to red
          fontSize: { sm: "12px", xs: "10px" },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: "#FAFAFA",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "#22222",
          fontWeight: 550,
          fontSize: "13px",
          textAlign: "center",
          height: "35px",
          margin: "0 !important",
          padding: "0 !important",
        },
        body: {
          fontSize: "13px",
          textAlign: "center",
          height: "43px",
          margin: "0 !important",
          padding: "0 !important",
          color: "#000",
        },
      },
    },
   MuiButton: {
  styleOverrides: {
    root: ({ theme }) => ({
      textTransform: "uppercase",
      fontWeight: 500,
      fontFamily: '"Poppins", sans-serif',
      
    }),
    sizeSmall: {
      padding: "4px 10px",
      fontSize: "12px",
    },
    startIcon: {
      marginRight: "5px",
      color: "inherit",
      "& > *:nth-of-type(1)": {
        fontSize: "18px",
      },
    },
  },
  defaultProps: {
    disableElevation: true,
    size: "small",
  },
},

  },
});
