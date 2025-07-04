import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleMenuTitleDayPlan } from "../../redux/slices/DayPalneModule";

const ReusableCarousalDayPlan = ({ items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menuItem } = useSelector((state) => state.DayPlannerModule);
  const [activeTitle, setActiveTitle] = useState(
    localStorage.getItem("activeMenuTitle") || menuItem
  );
  useEffect(() => {
    if (menuItem) {
      setActiveTitle(menuItem);
      localStorage.setItem("activeMenuTitle", menuItem);
    }
  }, [menuItem]);

  const handleMenuItemClick = (menu) => {
    if (!menu) return;

    switch (menu.id) {
      case 1:
        navigate(
          `/view/all/customers?viewType=4&customerViewType=1&customerView=2`
        );
        break;
      case 2:
        navigate(
          `/view/all/customers?viewType=5&customerView=2&customerViewType=2`
        );
        break;
      case 3:
        navigate(
          `/view/all/customers?viewType=6&customerView=2&customerViewType=3`
        );
        break;
      case 4:
        navigate(
          `/view/all/employees?viewType=7&customerViewType=2&customerView=4`
        );
        break;
      case 5:
        navigate(
          `/view/all/employees?viewType=8&customerViewType=5&customerView=2`
        );
        break;
      default:
        break;
    }
  };

  return (
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
      {items?.map((group, index) => (
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
          {group?.map((menuitem, i) => (
            <Stack
              key={i}
              onClick={() => handleMenuItemClick(menuitem)}
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
                  fontSize: { sm: "12px", xs: "10px" },
                  fontWeight: { sm: 600, xs: "bold" },
                  width: "100%",
                  marginTop: "30px", // space below the fixed count
                  color: menuitem.title === activeTitle ? "#ffa00d" : "black",
                  textDecoration:
                    menuitem.title === activeTitle ? "underline" : "none",
                }}
              >
                {menuitem.title}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ))}
    </Carousel>
  );
};

export default ReusableCarousalDayPlan;
