import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";

const CustomersViewTyped = () => {
  const { CustomerModuleMenu } = useSelector((state) => state.CustomerModule);
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [count]=useState(100)
  
  

  const calculateItemsPerRow = () => {
    const width = window.innerWidth;

    if (width >= 1440) {
      setItemsPerRow(4);
    } else if (width >= 768) {
      setItemsPerRow(3);
    } else {
      setItemsPerRow(2);
    }
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const carousalItems = chunkArray(CustomerModuleMenu, itemsPerRow);

  const getCarousalItem = (item) => {
    alert(item);
  };

  useEffect(() => {
    calculateItemsPerRow();
    window.addEventListener("resize", calculateItemsPerRow);

    return () => {
      window.removeEventListener("resize", calculateItemsPerRow);
    };
  }, []);

  return (
    <Box sx={{ mt: 10 }}>
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",

          zIndex: 9999,
        }}
      >
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
          duration={1000}
          animation="slide"
          navButtonsWrapperProps={{
            style: {},
          }}
          navButtonsProps={{
            style: { color: "#FFF", background: "#2478FE" },
          }}
        >
          {carousalItems.map((group, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              sx={{
                width: "100%",
                alignItems: "center",
                textAlign:"center",
                justifyContent: { sm: "space-evenly", xs: "center" },
                gap: { sm: "auto", xs: 1 },
                textTransform: "capitalize",
                pt:3, pb:3, height:'100px'
              }}
            >
              {group.map((menuitem, i) => (
                <Stack sx={{}}><Typography sx={{fontSize:'15px', fontWeight:'bold'}}>{menuitem.count}</Typography>
                <Typography
                  key={i}
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    color: "#011D45",
                    cursor: "pointer",
                    fontSize: { sm: "12px", xs: "10px" },
                    fontWeight: { sm: 600, xs: "bold" },
                    width: {sm:'130px', xs:'90px'},
                    textAlign: 'center'
                  }}
                  onClick={() => getCarousalItem(menuitem)}
                >
                  {menuitem.title}
                </Typography></Stack>
              ))}
            </Stack>
          ))}
        </Carousel>


      </Stack>
    </Box>
  );
};

export default CustomersViewTyped;
