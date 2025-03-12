import AssignmentIcon from "@mui/icons-material/Assignment";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { List, arrayMove } from "react-movable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReusableTextfield from "../common/ReusableTextfield";
import { toggleMenuTitle } from "../../redux/slices/MenuSlice";

const AllApprovals = () => {
  const formData = useSelector((state) => state.ApprovalModule.formData);
  const myapprovalData = useSelector(
    (state) => state.ApprovalModule.myapprovalData
  );
  const { currentMenuTitle, menuItems } = useSelector((state) => state.menu);
  const [clickSort, setClickSort] = useState(false);
  const [sortType, setSortType] = useState("ascending");
  const [filterClick, setFilterClick] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [param] = useSearchParams();
  let viewType = param.get("viewType");
  const nav = useNavigate();
  useEffect(() => {
    if (formData) {
      setData(formData);
    }
  }, [formData]);
  useEffect(() => {
    const sortedData = [...formData].sort((a, b) => a.id - b.id);
    setData(sortedData);
  }, []);
  const handleNavToViewTypes = (val) => {
    nav(`/view/approvals?viewType=${val}`);
    setFilterClick(false);
    setClickSort(false);
  };

  const handletakeAction = () => {
    viewType = 5;
    nav(`/view/approvals?viewType=${viewType}`);
  };
  const handleSorting = () => {
    setClickSort(!clickSort);
    setFilterClick(false);
  };
  const handleSortChange = (sort) => {
    if (sortType === sort) {
      setSortType(null);
      setData(formData);
      setClickSort(false);
      setFilterClick(false);
    } else {
      setSortType(sort);
      const sortedData = [...data].sort((a, b) =>
        sort === "ascending" ? a.id - b.id : b.id - a.id
      );
      setData(sortedData);
      setClickSort(false);
      setFilterClick(false);
    }
  };
  const handleFilterClick = () => {
    setFilterClick(!filterClick);
    setClickSort(false);
  };
  const [zIndex, setZIndex] = useState();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setZIndex(500);
      } else {
        setZIndex(1000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleNavToFormApprovalView = (formId) => {
    if (!formId) return;
    var menu = "form approvals";
    dispatch(toggleMenuTitle(menu));
    nav(`/status/view/${formId}`);
  };
  return (
    <Box sx={{ mt: 10 }}>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Stack sx={{ width: "95%" }}>
          <Stack
            sx={{
              borderRadius: "10px",
              border: "1px solid #E3E3E3",
              py: 2,
              px: 1,
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                gap: 2,
                "& > *": { alignItems: "center !important" },
                "& > * > :nth-of-type(2)": {
                  flexShrink: 0,
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: { sm: "14px", xs: "10px" },
                  cursor: "pointer",
                },
                "& > * > :nth-of-type(3)": {
                  flexShrink: 0,
                  color: "#333",
                  textTransform: "uppercase",
                  fontSize: { sm: "12px", xs: "8px" },
                  textAlign: "center",
                },
              }}
            >
              {myapprovalData.map(({ count, label, viewType }) => (
                <Stack key={viewType}>
                  <Typography>
                    <AssignmentIcon
                      sx={{
                        fontSize: "15px",
                        background: "#FFF8E5",
                        borderRadius: "100%",
                        p: 0.3,
                        color: "#FFCB1D",
                      }}
                    />
                  </Typography>
                  <Typography onClick={() => handleNavToViewTypes(viewType)}>
                    {count}
                  </Typography>
                  <Typography>{label}</Typography>
                </Stack>
              ))}
            </Stack>
            <Stack sx={{ mt: 3 }}>
              <Typography sx={{ fontSize: { sm: "12px", xs: "9px" } }}>
                Note: past 30 day's of approved & rejected forms are displayed
                from current date
              </Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              mt: 1,
              position: "relative",
            }}
          >
            <ReusableTextfield
              placeholder="search for forms"
              icon={<SearchIcon />}
              sx={{ width: "97%" }}
            />
            <SwapVertIcon
              sx={{ color: "#333", fontSize: "20px", cursor: "pointer" }}
              onClick={handleSorting}
            />
            {clickSort && (
              <Stack
                sx={{
                  position: "absolute",
                  right: 40,
                  top: 40,
                  border: "1px solid rgb(153, 153, 153)",
                  borderRadius: "5px",

                  background: "#FFF",
                  zIndex: { zIndex },
                  pr: 2,
                }}
              >
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "10px" },
                    m: 0,
                    p: 0,
                  }}
                  control={
                    <Checkbox
                      checked={sortType === "ascending"}
                      onChange={() => handleSortChange("ascending")}
                      size="small"
                    />
                  }
                  label="Ascending"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "10px" },
                    m: 0,
                    p: 0,
                    mt: -2,
                  }}
                  control={
                    <Checkbox
                      checked={sortType === "descending"}
                      onChange={() => handleSortChange("descending")}
                      size="small"
                    />
                  }
                  label="Descending"
                />
              </Stack>
            )}
            <FilterListIcon
              sx={{ color: "#333", fontSize: "20px", cursor: "pointer" }}
              onClick={handleFilterClick}
            />
            {filterClick && (
              <Stack
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 40,
                  background: "#f3f3f3",
                  zIndex: { zIndex },
                  py: 1.4,

                  boxShadow: "0 6px 12px rgba(0,0,0,.175)",
                  border: "1px solid rgba(0,0,0,.15)",
                }}
              >
                {myapprovalData.map((each) => (
                  <Typography
                    sx={{
                      fontSize: { sm: "13px", xs: "10px" },
                      px: 1.5,
                      py: 0.3,
                      cursor: "pointer",
                      color: "#011D45",
                      "&: hover": {
                        color: "#0D3443",
                        background: "#bab0b0",
                      },
                    }}
                    onClick={() => handleNavToViewTypes(each.viewType)}
                  >
                    {each.label}
                  </Typography>
                ))}
              </Stack>
            )}
          </Stack>
          {(viewType == 3 || viewType == 4) && (
            <Stack
              sx={{
                background: "#F8CBCC",
                flexDirection: "row",
                py: 1,
                gap: 0.5,
                px: 1,
                mt: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AssignmentIcon
                  sx={{
                    fontSize: "15px",
                    background: "#F6B8B7",
                    borderRadius: "100%",
                    p: 0.3,
                    color: "red",
                  }}
                />
                <Typography
                  sx={{ color: "red", fontSize: { sm: "12px", xs: "8px" } }}
                >
                  {" "}
                  you have 6 pending actions.
                </Typography>
              </Stack>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontSize: { sm: "10px", xs: "8px" },
                  color: "#777AF7",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={handletakeAction}
              >
                Take action
              </Typography>
            </Stack>
          )}
          <Stack sx={{ mt: 1 }}>
            {myapprovalData && myapprovalData.length > 0 ? (
              <List
                values={data}
                onChange={({ oldIndex, newIndex }) =>
                  setData(arrayMove(data, oldIndex, newIndex))
                }
                renderList={({ children, props }) => (
                  <Stack spacing={1} {...props}>
                    {children}
                  </Stack>
                )}
                renderItem={({ value, props }) =>
                  value ? (
                    <Stack
                      {...props}
                      key={value.id}
                      sx={{ mt: 1, cursor: "grab" }}
                    >
                      <Stack
                        sx={{
                          border: "1px solid #E3E3E3",
                          borderRadius: "5px",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          px: 1,
                          py: 3,
                          backgroundColor: "white",
                          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                        }}
                        // onPointerUp={(e) => {
                        //   e.stopPropagation();
                        //   if (value?.id) {
                        //     handleNavToFormApprovalView(value.id);
                        //   }
                        // }}
                        
                      >
                        <Stack
                          sx={{
                            alignItems: "center",
                            flexDirection: { sm: "row", xs: "column" },
                            width: "60%",
                            justifyContent: "space-between",
                            gap: { sm: 0, xs: 2 },
                          }}
                        >
                          <Stack
                            sx={{
                              "& > *": {
                                fontSize: "10px",
                              },
                            }}
                          >
                            {(viewType == 2 || viewType == 5) && (
                              <Typography>waiting for {value.team}</Typography>
                            )}
                            <Typography>form: {value.id}</Typography>
                            <Typography>
                              submitted by: {value.submittedBy}
                            </Typography>
                            <Typography>
                              submitted time: {value.submitTime}
                            </Typography>
                          </Stack>
                          <Button
                            variant="outlined"
                            sx={{
                              fontSize: "10px",
                              color: "red",
                              borderColor: "red",
                            }}
                          >
                            approve/reject
                          </Button>
                        </Stack>

                        <Button variant="outlined" sx={{ fontSize: "10px" }}>
                          approved
                        </Button>
                      </Stack>
                    </Stack>
                  ) : (
                    <Typography>ok</Typography>
                  )
                }
              />
            ) : (
              <Typography sx={{ textAlign: "center" }}>
                No data found
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AllApprovals;
