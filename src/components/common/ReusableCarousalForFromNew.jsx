import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setTitleForCustomerView } from "../../redux/slices/CustomerModule";

const ReusableCarousalForFromNew = ({ items }) => {
  const [activecarousal, setActiveCarousal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [param] = useSearchParams();
  const empId = Number(param.get("empId"));
  const viewType = Number(param.get("viewType"));
  const formSpecId = Number(param.get("formSpecId"));
  const approvalView = Number(param.get("approvalView"));
  useEffect(() => {
    if (approvalView) {
      setActiveCarousal(approvalView);
    }
  }, []);

  const handleViewTypeChange = (id, title) => {
    dispatch(setTitleForCustomerView(title));

    setActiveCarousal(id);

    switch (id) {
      case 1:
        navigate(
          `/view/forms/new?formSpecId=${formSpecId}&empId=${empId}&viewType=2&byMe=true&approvalView=1`
        );
        break;
      case 2:
        navigate(
          `/view/forms/new?formSpecId=${formSpecId}&empId=${empId}&viewType=5&approvalView=2`
        );
        break;
      case 3:
        navigate(
          `/view/forms/new?formSpecId=${formSpecId}&empId=${empId}&viewType=2&approvalView=3&splitTeamWise=1&statusMessage=`
        );
        break;
      case 15:
        navigate(
          `/view/forms/new?formSpecId=${formSpecId}&empId=${empId}&viewType=3&approvalView=15`
        );
        break;
      case 16:
        navigate(
          `/view/forms/new?formSpecId=${formSpecId}&empId=${empId}&viewType=4&approvalView=16`
        );
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
         <Box key={`carousel-group-${index}`} sx={{ width: "100%" }}>
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
                  color: menuitem.id === activecarousal ? "#ffa00d" : "#011D45",
                  textDecoration:
                    menuitem.id === activecarousal ? "underline" : "none",
                }}
              >
                {menuitem.title}
              </Typography>
            </Stack>
          ))}
        </Stack> </Box>
      ))}
    </Carousel>
  );
};

export default ReusableCarousalForFromNew;
