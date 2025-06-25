import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
const ResuableCarousal = ({ items, isActiveViewType }) => {
  const [activecarousal, setIsActiveCarousal] = useState(0);
  useEffect(() => {
    if ([1, 2, 3, 5, 6].includes(isActiveViewType)) {
      setIsActiveCarousal(isActiveViewType);
    } else {
      console.warn("No navigation defined for this menu item");
    }
  }, [isActiveViewType]);
  useEffect(() => {
    console.log(items);
  }, []);
  const navigate = useNavigate();
  const handleViewTypeChange = (leaveViewType) => {
    if (leaveViewType === 1) {
      navigate(`/view/leaves/new?leaveMenuType=1&viewType=1&leaveViewType=1`);
    } else if (leaveViewType === 2) {
      navigate(
        `/view/leaves/new?leaveMenuType=2&viewType=2&teamLeaves=1&leaveViewType=2`
      );
    } else if (leaveViewType === 3) {
      navigate(
        `/view/leaves/new?leaveMenuType=2&viewType=3&teamLeaves=2&leaveViewType=3`
      );
    } else if (leaveViewType === 6) {
      navigate(`/view/leaves/new?leaveMenuType=6&viewType=4&leaveViewType=6 `);
    } else if (leaveViewType === 5) {
      navigate(`/view/leaves/new?leaveMenuType=5&viewType=3&leaveViewType=5`);
    } else {
      navigate(`/view/leaves/new?leaveMenuType=6&viewType=4&leaveViewType=6`);
    }
  };

  return (
    <>
      <Carousel
          sx={{
        mt: 0.1,
        width: "99%",
        borderRadius: "5px",
        position: "relative",
        boxShadow:
          "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)",
      }}
      indicators={false}
      navButtonsAlwaysVisible={true}
      duration={2000}
      animation="slide"
      navButtonsProps={{
        sx: {
          color: "#FFF",
          background: "#2478FE",
          fontSize: "12px",
          padding: "4px 4px",
          width: "25px", // Responsive width
          height: "25px",
          borderRadius: "50%",
        },
      }}
      navButtonsWrapperProps={{
        sx: {
          marginTop: "10px", // Shift both buttons down together
        },
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
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  width: { sm: "130px", xs: "90px" },
                  minHeight: "60px", // enough space for count and title
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
                onClick={() => handleViewTypeChange(menuitem.leaveViewType)}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: 10,
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  {menuitem.count}
                </Typography>
                <Typography
                  sx={{
                    color: "#011D45",
                    fontSize: { sm: "12px", xs: "10px" },
                    fontWeight: { sm: 600, xs: "bold" },
                    width: "100%",
                    marginTop: "30px", // space below the fixed count
                    color:
                      menuitem.leaveViewType == isActiveViewType
                        ? "#ffa00d"
                        : "#011D45",
                    textDecoration:
                      menuitem.leaveViewType == isActiveViewType
                        ? "underline"
                        : "none",
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
