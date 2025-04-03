import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ReusableCarousalForWorks from "../common/ReusableCarousalForWorks";
import ReusableTextfield from "../common/ReusableTextfield";

const WorkspecActionNew = () => {
  const { workspecMenu } = useSelector((state) => state.WorkSepcModule);
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [param] = useSearchParams();
  const workView = Number(param.get("workView")) || 0;
  const calculateItemsPerRow = () => {
    const width = window.innerWidth;
    if (width >= 1440) {
      setItemsPerRow(4);
    } else if (width >= 768) {
      setItemsPerRow(4);
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
  const carousalItems = chunkArray(workspecMenu, itemsPerRow);
  useEffect(() => {
    calculateItemsPerRow();
    window.addEventListener("resize", calculateItemsPerRow);
    return () => {
      window.removeEventListener("resize", calculateItemsPerRow);
    };
  }, []);
  const [activeTile, setActiveTile] = useState("");

  useEffect(() => {
    const storedTitle = localStorage.getItem("activeTileforwork");
    if (storedTitle) {
      setActiveTile(storedTitle);
    }
  }, []);

  const handleActiveTileChange = (title) => {
    localStorage.setItem("activeTileforwork", title);
    setActiveTile(title);
  };

  return (
    <Box sx={{ mt: 10 }}>
      <ReusableCarousalForWorks
        items={carousalItems}
        onActiveTileChange={handleActiveTileChange}
      />
      <Typography
        sx={{
          color: "#FFF",

          fontSize: { sm: 20, xs: 15 },
          fontWeight: { sm: 500, xs: 400 },
          position: "absolute",
          top: { sm: 17, xs: 20 },
          zIndex: 9999,
          left: 55,
        }}
      >
        Daily Maintenance Log
      </Typography>
      <Stack
        sx={{
          px: 1,
          my: 1,
          background: "#fff",
          mx: 1,
          py: 1,
          borderRadius: "5px",
          border: "1px solid #EBEBEB",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontSize: { sm: "13px", xs: "10px" },
          }}
        >
          {activeTile}
        </Typography>
        <Stack sx={{ mt: 0.5 }}>
          <ReusableTextfield
            placeholder="search by work id or work name"
            icon={<SearchIcon />}
          />
        </Stack>
        <Stack sx={{ my: 2 }}>
          {workView === 2 && (
            <Typography
              sx={{
                textAlign: "center",
                background: "#fff",
                py: 1.5,
                border: "1px solid #EBEBEB",
                fontSize: { sm: "12px", xs: "10px" },
              }}
            >
              No data found
            </Typography>
          )}{" "}
        </Stack>
      </Stack>
    </Box>
  );
};

export default WorkspecActionNew;
