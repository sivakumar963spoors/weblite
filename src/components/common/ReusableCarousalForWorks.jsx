import { Stack, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate, useSearchParams } from "react-router-dom";
const ReusableCarousalForWorks = ({ items, onActiveTileChange }) => {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const viewType = Number(param.get("viewType")) || 0;
  const handleViewTypeChange = (viewType, workview, title) => {
    onActiveTileChange?.(title);

    let url;
    workview === 2
      ? (url = `/workSpec/actionable/details/byTeam?workSpecId=14291&viewType=${viewType}&workView=${workview}`)
      : (url = `/workSpec/actions/new?workSpecId=14291&viewType=${viewType}&workView=${workview}`);
    navigate(url);
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
              onClick={() =>
                handleViewTypeChange(
                  menuitem.viewtype,
                  menuitem.workview,
                  menuitem.title
                )
              }
              sx={{ cursor: "pointer" }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                {menuitem.count}
              </Typography>
              <Typography
                sx={{
                  fontSize: { sm: "10px", xs: "8px" },
                  fontWeight: { sm: 600, xs: 500 },
                  width: { sm: "130px", xs: "90px" },
                  textAlign: "center",
                  color: menuitem.viewtype === viewType ? "#ffa00d" : "#011D45",
                  textDecoration:
                    menuitem.viewtype === viewType ? "underline" : "none",
                }}
              >
                {menuitem.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { sm: "10px", xs: "8px" },
                  fontWeight: { sm: 600, xs: "bold" },
                  width: { sm: "130px", xs: "90px" },
                  textAlign: "center",
                  color: menuitem.viewtype === viewType ? "#ffa00d" : "#011D45",
                  textDecoration:
                    menuitem.viewtype === viewType ? "underline" : "none",
                }}
              >
                {menuitem.subtitle !== "" && `(${menuitem.subtitle})`}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ))}
    </Carousel>
  );
};

export default ReusableCarousalForWorks;
