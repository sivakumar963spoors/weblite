import { Button } from '@mui/material';
import PropTypes from "prop-types";
import React from 'react';
const CustomButton = ({  title,
  size = "small",
  onClick,
  startIcon,
  variant,}) => {
  const buttonStyle = {
    color: "#337ab7",
    border: "1px solid #ddd",
    p: 0,
    px: 1,
    py: 0.2,
    fontWeight: "bold",
    textTransform:'capitalize',
    fontSize:{xs:'10px',sm:'15px'}
  };
  return (
    <Button
    size={size}
    onClick={onClick}
    startIcon={startIcon}
    variant={variant}
    sx={buttonStyle}

  >
    {title}
  </Button>
  );
};

export default CustomButton;




CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["outlined", "contained"]),
  onClick: PropTypes.func,
  startIcon: PropTypes.element,
};
