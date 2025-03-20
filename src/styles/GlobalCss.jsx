export const globalstyle ={
    datepicker:{
        mt: 1,
        width: "100%",
        "& .MuiOutlinedInput-root": {
          display: "flex",
          alignItems: "center",
          height: "40px",
          overflowY: "hidden",
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
          color: "gray",
        },
        "& .MuiInputLabel-shrink": {
          top: 0,
          left: 15,
          transform: "translateY(-40%)",
          color: "gray",
        },
        "& .MuiInputBase-input": {
          fontSize: "12px",
          color: "#555 ",
          fontWeight: "500",
        },
      },
      autoCompleteSelect:{
       
       width:'100%',
          mt: 1,
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
          "& .MuiInputBase-input": {
            fontSize: "12px",
            color:'#333',
            padding: "10px 12px", 
            lineHeight: "normal",
            textTransform: "capitalize",
          },
          "& .MuiAutocomplete-endAdornment": {
            display: "flex",
            alignItems: "center", 
          },
          "& .MuiInputLabel-root": {
            fontSize: "12px",
            height: "100%",
            color: "gray",
            marginTop: "-5px",
          },
          "& .MuiInputLabel-shrink": {
            fontSize: "14px",
            marginTop: "3px",
            color: "gray",
          },
        },
      textFieldPassword :{
        '& .MuiOutlinedInput-root': {
          height: '45px',
          '& fieldset': {
            border: '1px solid #E3E3E3',
            borderTop: "2px solid #E3E3E3"
          },
          '&:hover fieldset': {
            border: '1px solid #E3E3E3',
          },
          '&.Mui-focused fieldset': {
            border: '1px solid #E3E3E3',
            boxShadow: '0px 0px 10px 1px rgba(140, 210, 233, 0.63)',
          },
        },
        '& .MuiInputBase-input': {
          padding: '10px',
          fontSize: '12px',
          textTransform: 'capitalize'
        },
        '& .MuiInputAdornment-root': {
          color: 'green',
        },
       
      }
}