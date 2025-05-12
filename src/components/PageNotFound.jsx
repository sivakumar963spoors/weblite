import { Box } from "@mui/material";
import React from "react";

const PageNotFound = () => {
  return (
    <div>
      <Box
        sx={{
          mt: 10,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent:'center'
        }}
      >
        <Box
          sx={{
            width: "50%",
            backgroundImage: `url(${"https://png.pngtree.com/png-vector/20210702/ourmid/pngtree-error-404-page-not-found-website-png-image_3545448.jpg"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "550px",
            textAlign: "center",
          }}
        ></Box>
      </Box>
    </div>
  );
};

export default PageNotFound;
