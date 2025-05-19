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
  const {
    CustomerModuleMenu,
    customerViewTypeTitle,
    displayCountForCustomerModule,
  } = useSelector((state) => state.CustomerModule);

  useEffect(() => {
    // Flatten the nested items array
    const flatItems = items.flat();

    const matchedItem = flatItems.find(
      (item) => item.title === customerViewTypeTitle
    );

    if (matchedItem) {
      setActiveCarousal(matchedItem.id); // Use `id` if that's what your logic tracks
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
    }
  };

  return (
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
              sx={{ cursor: "pointer" }} 
            >
              <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>
                {menuitem.count }
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: { sm: "12px", xs: "10px" },
                  fontWeight: { sm: 600, xs: "bold" },
                  width: { sm: "130px", xs: "90px" },
                  textAlign: "center",
                  color: menuitem.id === activecarousal ? "#ffa00d" : "#011D45",
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
  );
};

export default ResuableCarousal;
