import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReusableCarousalForWorks from "../common/ReusableCarousalForWorks";
import { useSelector } from "react-redux";
import ReusableTextfield from "../common/ReusableTextfield";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSearchParams } from "react-router-dom";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
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
          {workView === 1 && (
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
          {workView === 3 && (
            <>
              <Stack
                sx={{
                  flexDirection: "row",
                  width: "100%",
                  background: "#fff",
                  "&: hover": {
                    background: "#ddd",
                  },
                  px: 1.5,
                  py: 5,
                  border: "1px solid #EBEBEB",

                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack
                  sx={{
                    " & > * ": {
                      flexDirection: "row",
                    },

                    "& > * >:nth-child(2)": {
                      color: "#000",
                      fontWeight: 500,
                      fontSize: {
                        sm: "12px",
                        xs: "10px",
                      },
                    },
                    "& > * >:nth-child(1)": {
                      color: "#4B4B4B",
                      fontSize: {
                        sm: "12px",
                        xs: "10px",
                      },
                    },
                    "& > :nth-child(1)": {
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: {
                        sm: "12px",
                        xs: "10px",
                      },
                    },
                  }}
                >
                  <Typography>Id:7162</Typography>
                  <Stack>
                    <Typography>work name&nbsp;:</Typography>
                    <Typography> &nbsp;kishore new test</Typography>
                  </Stack>{" "}
                  <Stack>
                    <Typography>assignTo&nbsp;:</Typography>
                    <Typography> &nbsp;amtul imrana</Typography>
                  </Stack>{" "}
                  <Stack>
                    <Typography>starts :</Typography>
                    <Typography></Typography>
                  </Stack>{" "}
                  <Stack>
                    <Typography>ends :</Typography>
                    <Typography></Typography>
                  </Stack>{" "}
                  <Stack>
                    <Typography>lastctivity :</Typography>
                    <Typography></Typography>
                  </Stack>
                </Stack>
                <Stack>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#FF8C00!important",
                      borderColor: "#FF8C00!important",
                      background: "#FFF",
                      fontSize: {
                        sm: "12px",
                        xs: "8px",
                      },
                    }}
                    startIcon={<DirectionsRunIcon color="#FF8C00" />}
                  >
                    in-progress
                  </Button>
                </Stack>
              </Stack>
            </>
          )}
          {workView === 4 && (
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
          )}
          {workView === 5 && (
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
          )}
          {workView === 9 && (
            <>
              <Stack
                sx={{
                  flexDirection: "row",
                  width: "100%",
                  background: "#fff",
                  "&: hover": {
                    background: "#ddd",
                  },
                  px: 1.5,
                  py: 5,
                  border: "1px solid #EBEBEB",

                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack
                  sx={{
                    " & > * ": {
                      flexDirection: "row",
                    },

                    "& > * >:nth-child(2)": {
                      color: "#000",
                      fontWeight: 500,
                      fontSize: {
                        sm: "12px",
                        xs: "10px",
                      },
                    },
                    "& > * >:nth-child(1)": {
                      color: "#4B4B4B",
                      fontSize: {
                        sm: "12px",
                        xs: "10px",
                      },
                    },
                    "& > :nth-child(1)": {
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: {
                        sm: "12px",
                        xs: "10px",
                      },
                    },
                  }}
                >
                  <Typography>Id:7162</Typography>
                  <Stack>
                    <Typography>work name&nbsp;:</Typography>
                    <Typography> &nbsp;kishore new test</Typography>
                  </Stack>{" "}
                  <Stack>
                    <Typography>assignTo&nbsp;:</Typography>
                    <Typography> &nbsp;amtul imrana</Typography>
                  </Stack>{" "}
                  <Stack>
                    <Typography>starts :</Typography>
                    <Typography></Typography>
                  </Stack>{" "}
                  <Stack>
                    <Typography>ends :</Typography>
                    <Typography></Typography>
                  </Stack>{" "}
                  <Stack>
                    <Typography>lastctivity :</Typography>
                    <Typography></Typography>
                  </Stack>
                </Stack>
                <Stack>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#34A76F!important",
                      borderColor: "#34A76F!important",
                      background: "#FFF",
                      fontSize: {
                        sm: "12px",
                        xs: "10px",
                      },
                    }}
                  >
                    completed
                  </Button>
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
        <Stack sx={{ position: "fixed", bottom: 10, right: 10 }}>
          <Button
            startIcon={<AddCircleOutlineIcon sx={{}} />}
            sx={{
              borderRadius: "30px",
              background: "#2478FE",
              color: "#FFF",
              fontWeight: "bold",
              fontSize: { md: "13px", xs: "10px" },
            }}
            variant="outlined"
          >
            create new
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default WorkspecActionNew;
