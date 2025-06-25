import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTitleForCustomerView } from "../../redux/slices/CustomerModule";

const ResuableCarousal = ({ items }) => {
  const [activecarousal, setActiveCarousal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerViewTypeTitle } = useSelector(
    (state) => state.CustomerModule
  );

  useEffect(() => {
    console.log("customerViewTypeTitle:", customerViewTypeTitle);

    const flatItems = items.flat();
    const matchedItem = flatItems.find((item) => {
      const itemTitle = item.title?.trim().toLowerCase();
      const targetTitle = customerViewTypeTitle?.trim().toLowerCase();
      return itemTitle === targetTitle;
    });
    if (matchedItem) {
      setActiveCarousal(matchedItem.id); // or whatever logic you're using
    }
  }, [customerViewTypeTitle, items]);

  const handleViewTypeChange = (id, title) => {
    dispatch(setTitleForCustomerView(title));

    setActiveCarousal(id);

    switch (id) {
      case 1:
        navigate("/view/all/customers/typed?viewType=1&customerView=1");
        break;
      case 2:
        navigate("/view/all/customers/typed?viewType=8&customerView=1");
        break;
      case 3:
        navigate("/view/all/customers/typed?viewType=14&customerView=1");
        break;
      case 4:
        navigate("/view/all/customers/typed?viewType=3&customerView=1");
        break;
      case 5:
        navigate("/view/all/customers/typed?viewType=7&customerView=1");
        break;
      case 6:
        navigate("/view/all/customers/typed?viewType=10&customerView=1");
        break;
      case 7:
        navigate("/view/all/customers/typed?viewType=11&customerView=1");
        break;
      case 8:
        navigate("/view/all/customers/typed?viewType=12&customerView=1");
        break;
      case 11:
        navigate(
          `/view/all/customers/typed?viewType=4&customerViewType=1&customerView=2`
        );
        break;
      case 12:
        navigate(
          `/view/all/customers/typed?viewType=5&customerViewType=2&customerView=2`
        );
        break;
      case 13:
        navigate(
          `/view/all/customers/typed?viewType=6&customerViewType=3&customerView=2`
        );
        break;
      case 14:
        navigate(`/view/all/customers/typed?viewType=7&customerView=2`);
        break;
      case 15:
        navigate(`/view/all/customers/typed?viewType=8&customerView=2`);
        break;
      default:
        console.warn("Unknown view type ID:", id);
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
              {/* Count - fixed at top */}
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

              {/* Title - grows below */}
              <Typography
                sx={{
               
                  fontSize: { sm: "12px", xs: "10px" },
                  fontWeight: { sm: 600, xs: "bold" },
                  width: "100%",
                  marginTop: "30px", // space below the fixed count
                  color: menuitem.id === activecarousal ? "#ffa00d" : "#011D45",
                  textDecoration:
                    menuitem.id === activecarousal ? "underline" : "none",
                  wordBreak: "break-word",
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

export default ResuableCarousal;
