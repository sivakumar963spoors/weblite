import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

const ResuableCarousal = ({ items, onActiveTileChange }) => {
  const [activecarousal, setIsActiveCarousal] = useState(0);

  const nav = useNavigate();
  const handleViewTypeChange = (viewType, title) => {
    setIsActiveCarousal(viewType);
    onActiveTileChange(title); // Pass title to parent
    nav(`/customers/viewtype/${viewType}`);
  };

  return (
    <>
      <Carousel
        sx={{
          mt: 0.1,
          width: "99%",
          borderRadius: "5px",
          boxShadow:
            "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)",
        }}
        autoPlay={true}
        indicators={false}
        navButtonsAlwaysVisible={true}
        duration={2000}
        animation="slide"
        navButtonsProps={{
          style: { color: "#FFF", background: "#2478FE" },
        }}
      >
        {items.map((group, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              alignItems: "center",
              textAlign: "center",
              justifyContent: { sm: "space-evenly", xs: "center" },
              gap: { sm: "auto", xs: 1 },
              textTransform: "capitalize",
              pt: 3,
              pb: 3,
              height: "100px",
            }}
          >
            {group.map((menuitem, i) => (
              <Stack
                key={i}
                onClick={() => handleViewTypeChange(menuitem.id, menuitem.title)}
              >
                <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                  {menuitem.count}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    color: "#011D45",
                    cursor: "pointer",
                    fontSize: { sm: "12px", xs: "10px" },
                    fontWeight: { sm: 600, xs: "bold" },
                    width: { sm: "130px", xs: "90px" },
                    textAlign: "center",
                    color: menuitem.id === activecarousal ? "#ffa00d" : "black",
                    textDecoration:
                      menuitem.id === activecarousal ? "underline" : "none",
                  }}
                >
                  {menuitem.title}
                </Typography>
              </Stack>
            ))}
          </Stack>
        ))}
      </Carousel>
    </>
  );
};

export default ResuableCarousal;
