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
import { useEffect, useState } from "react";
import { List, arrayMove } from "react-movable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchFormAPproval } from "../../redux/slices/ApprovalSlice";
import ReusableTextfield from "../common/ReusableTextfield";
import DottedSpinner from "../common/DottedSpinner";

const AllApprovals = () => {
  const { myapprovalData, formData, loading } = useSelector(
    (state) => state.ApprovalModule
  );

  const [clickSort, setClickSort] = useState(false);
  const [sortType, setSortType] = useState("descending");
  const [filterClick, setFilterClick] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [param] = useSearchParams();
  let viewType = Number(param.get("viewType"));
  let sortBy = Number(param.get("sortBy"));
  const [active, setActive] = useState(viewType);
  const nav = useNavigate();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (viewType && sortBy) {
      dispatch(fetchFormAPproval({ viewType: active, sortBy: sortBy }));
    } else if (sortBy) {
      dispatch(fetchFormAPproval({ sortBy: sortBy }));
    } else {
      dispatch(fetchFormAPproval({ viewType: viewType }));
    }
  }, [dispatch, active, sortBy, viewType]);
  useEffect(() => {
    if (
      formData?.workflowStatuses &&
      Array.isArray(formData.workflowStatuses)
    ) {
      setData(formData.workflowStatuses);
    } else {
      setData([]);
    }
    setActive(viewType);
  }, [formData, viewType]);

  useEffect(() => {
    setSortType("descending");
  }, []);

  const handleNavToViewTypes = (val) => {
    setActive(val);
    setSortType("descending");
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
    setSortType(sort);
    if (sort === "ascending") {
      nav(`/view/approvals?viewType=${viewType}&sortBy=2`);
    } else if (sort === "descending") {
      nav(`/view/approvals?viewType=${viewType}`);
    }
    setClickSort(false);
  };
  const handleFilterClick = () => {
    setFilterClick(!filterClick);
    setClickSort(false);
  };
  const [zIndex, setZIndex] = useState(1000);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setZIndex(500);
      } else {
        setZIndex(1000000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleNavToFormApprovalView = (formId) => {
    if (!formId) return;
    nav(`/workflow/status/view/${formId}?isWebLiteView=true`);
  };
  const handleSearchItem = (e) => {
    const rawValue = e.target.value;
    const trimmedValue = rawValue.trim();
    setSearchText(trimmedValue);
  };
  const searchedArray = searchText
    ? data?.filter((item) => String(item.formId).includes(searchText))
    : data;

  return (
    <Box sx={{ mt: 10 }}>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        {loading ? (
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              textAlign: "center",
              mt: 10,
              flexDirection: "row",
            }}
          >
            <Typography>Loading ....</Typography>
            <DottedSpinner size={20} color="#1976d2" thickness={4} />
          </Stack>
        ) : (
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
                {myapprovalData?.map(({ label, viewType }) => {
                  const count =
                    viewType === 2
                      ? formData?.pendingApprovals
                      : viewType === 3
                      ? formData?.approvedApprovals
                      : viewType === 4
                      ? formData?.rejectedApprovals
                      : viewType === 5
                      ? formData?.pendingApprovalByMe
                      : 0;

                  return (
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
                      <Typography
                        onClick={() => handleNavToViewTypes(viewType)}
                      >
                        {count}
                      </Typography>
                      <Typography
                        sx={{
                          textDecoration:
                            active === viewType ? "underline" : "none",
                          color:
                            active === viewType ? "orange !important" : "#000",
                        }}
                      >
                        {label}
                      </Typography>
                    </Stack>
                  );
                })}
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
                value={searchText}
                onChange={handleSearchItem}
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
                        onChange={() => handleSortChange("ascending", viewType)}
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
                        onChange={() =>
                          handleSortChange("descending", viewType)
                        }
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
                        fontSize: { sm: "13px", xs: "12px" },
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
            {(viewType === 3 || viewType === 4 || viewType === 1) && (
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
                <Stack spacing={1}>
                  {searchedArray.map((value) => (
                    <Stack
                      key={value.id}
                      sx={{ mt: 1, cursor: "pointer" }}
                      onClick={() => handleNavToFormApprovalView(value.formId)}
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
                            {(value.status === 0 || value.status === 2) && (
                              <Typography>{value.statusMessage}</Typography>
                            )}
                            <Typography>
                              form: {value.formId} &nbsp;
                              {value.formIdentifier}
                            </Typography>
                            <Typography>
                              submitted by: {value.submittedName}
                            </Typography>
                            <Typography>
                              submitted time: {value.submittedTimeLTZ}
                            </Typography>
                          </Stack>

                          {value.isInGroup === 1 && value.status !== -1 && (
                            <Button
                              variant="outlined"
                              sx={{
                                border: "1px solid #FF7271!important",
                                color: "#FF7271",
                                fontSize: { sm: "14px", xs: "10px" },
                              }}
                            >
                              Approve/Reject
                            </Button>
                          )}
                          {value.isInGroup === 1 && value.status === -1 && (
                            <Button
                              variant="outlined"
                              sx={{
                                border: "1px solid #ff2424",
                                color: "#ff2424",
                              }}
                            >
                              Resubmit/cancel
                            </Button>
                          )}
                        </Stack>

                        {/* Status Buttons */}
                        {(value.status === 0 || value.status === 2) && (
                          <Button
                            variant="outlined"
                            sx={{
                              border:
                                value.isInGroup === 1
                                  ? "1px solid #ff2424"
                                  : "1px solid #ffa00d",
                              color:
                                value.isInGroup === 1 ? "#ff2424" : "#ffa00d",
                            }}
                          >
                            Pending
                          </Button>
                        )}

                        {value.status === 1 && (
                          <Button
                            variant="outlined"
                            sx={{
                              border: "1px solid #24a68a",
                              color: "#24a68a",
                            }}
                          >
                            Approved
                          </Button>
                        )}

                        {value.status === -1 && (
                          <Button
                            variant="outlined"
                            sx={{
                              border: "1px solid #ff2424",
                              color: "#ff2424",
                            }}
                          >
                            Rejected
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              ) : (
                <Typography sx={{ textAlign: "center", fontSize: "50px" }}>
                  No data found
                </Typography>
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default AllApprovals;
