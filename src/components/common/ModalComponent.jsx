import React from "react";
import { Modal, Box, Slide, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const ReusableModal = ({ open, onClose, title, children,  }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Box
         sx={{
          position: "absolute",
          top: "20%",
          left:{md:'15%', xs:0},
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", md: "70%" }, 
          bgcolor: "background.paper",
          boxShadow: 24,
          outline: "none", 
            border: "none", 
          p: 4,
          borderRadius: "12px",
          textAlign: "center",
        }}
        >
         
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">{title}</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {children}
        </Box>
      </Slide>
    </Modal>
  );
};

export default ReusableModal;
