import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const ReusableButton = ({
  title,
  size = "small",
  onClick,
  endIcon,
  variant,
}) => {
  const buttonStyle = {
    color: "#337ab7",
    border: "1px solid #ddd",
    p: 0,
    px: 1,
    py: 0.2,
    fontWeight: "bold",
    textTransform:'capitalize'
  };
  return (
    <Button
      size={size}
      onClick={onClick}
      endIcon={endIcon}
      variant={variant}
      sx={buttonStyle}
 
    >
      {title}
    </Button>
  );
};

ReusableButton.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["outlined", "contained"]),
  onClick: PropTypes.func,
  endIcon: PropTypes.element,
};

export default ReusableButton;
