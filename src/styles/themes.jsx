import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { createTheme } from "@mui/material";
export const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: '"Poppins", sans-serif !important',
        textTransform: "capitalize",
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
            openPickerIcon: CalendarMonthIcon, // Change the default calendar icon
          },
          slotProps: {
            openPickerButton: {
              sx: {
                color: "#F06E70", // Only applies to the date picker icon
              },
            },
          },
          desktopModeMediaQuery: "(min-width: 0px)", // Ensures consistent behavior
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
        },}
     
    }
    
  });
  
  