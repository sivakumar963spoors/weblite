import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchFormdata } from "../../redux/slices/FormsSlice";
import {
  fetchTodayCount,
  fetchYesterdayCount,
} from "../../redux/slices/HomePageSlice";
import ReusableTextfield from "../common/ReusableTextfield";
const ViewForms = () => {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const empId = Number(param.get("empId"));
  const viewType = Number(param.get("viewType"));
  const formSpecId = Number(param.get("formSpecId"));
  const { formsDetails, loading } = useSelector((state) => state.FormsModule);
  const {
    LoadHomeScreenCards,
    filteredHomePageData,
    loggedInUser,
    yesterdayCount,
    todayCount,
    loadActionableWorksByMe,
    workSpecCards,
    pendingByMe,
    pendingByTeam,
    inactiveWorks,
    loadFormApprovalsCountByMe_byMe,
    loadFormApprovalsCountByManager_byManager,
    isLoadHomeScreenCards,
  } = useSelector((state) => state.HomePageModule);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchYesterdayCount(empId));
    dispatch(fetchTodayCount(empId));
  }, [dispatch]);
  useEffect(() => {
    if (viewType === 101) {
      dispatch(
        fetchFormdata({
          formSpecId: formSpecId,
          empId: empId,
          viewType: viewType,
        })
      );
    } else if (viewType === 102) {
      dispatch(
        fetchFormdata({
          formSpecId: formSpecId,
          empId: empId,
          viewType: viewType,
        })
      );
    } else {
      dispatch(
        fetchFormdata({
          empId: empId,
          viewType: viewType,
          formSpecId: formSpecId,
        })
      );
    }
  }, [dispatch, formSpecId, viewType, empId]);
  const handleViewType = (view, formSpecId, empId) => {
    navigate(
      `/view/forms?formSpecId=${formSpecId}&empId=${empId}&viewType=${view}`
    );
  };
  const handleNavToSubmitForm = () => {
    navigate("/add/form/1200");
  };
  return (
    <Box sx={{ mt: 8 }}>
      {loading ? (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { xs: 12, sm: 14 },
            py: 1.5,
            background: "#fff",
            mt: 1,
            border: "1px solid #EBEBEB",
          }}
        >
          {" "}
          loading.....
        </Typography>
      ) : (
        <>
          <Stack sx={{ background: "", py: 1.5 }}>
            <Typography
              sx={{
                color: "#FFF",

                fontSize: { sm: 15, xs: 15 },
                fontWeight: { sm: 600, xs: 600 },
                position: "absolute",
                top: 20,
                zIndex: 9999,
                left: 50,
              }}
            >
              {formsDetails?.formSpec?.formTitle.length > 20
                ? `${formsDetails?.formSpec?.formTitle.slice(0, 20)}...`
                : formsDetails?.formSpec?.formTitle}
            </Typography>
          </Stack>
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Stack sx={{ width: "95%", gap: 1 }}>
              {(formsDetails?.approvalFormFlag === false ||
                formsDetails?.approvalFormFlag === "false") && (
                <Typography
                  sx={{
                    fontSize: { sm: "12px", xs: "10px" },
                    fontWeight: 400,
                    ml: 0.7,
                  }}
                >
                  Note: Past 10 Day's Of Forms Data Are Displayed From Current
                  Date
                </Typography>
              )}
              <Stack
                sx={{
                  width: "100%",
                  background: "#fff",
                  border: "1px solid #E3E3E3",
                  borderRadius: "10px",
                }}
              >
                <Stack
                  sx={{
                    py: 2,
                    px: 1,
                  }}
                >
                  {(formsDetails?.approvalFormFlag === false ||
                    formsDetails?.approvalFormFlag === "false") && (
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
                      <Stack
                        onClick={() =>
                          handleViewType(
                            101,
                            formsDetails?.formSpec?.formSpecId,
                            empId
                          )
                        }
                      >
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
                        <Typography>
                          {(() => {
                            const matchingGroup = todayCount?.find((group) =>
                              group.forms?.some(
                                (form) =>
                                  form.formSpecId ===
                                  formsDetails?.formSpec?.formSpecId
                              )
                            );

                            const size = matchingGroup?.size ?? 0;

                            return (
                              <Typography component={"span"}>{size}</Typography>
                            );
                          })()}
                        </Typography>
                        <Typography
                          sx={{
                            textDecoration:
                              viewType === 101 ? "underline" : "none",
                            color:
                              viewType === 101 ? "orange !important " : "#000",
                          }}
                        >
                          filled today
                        </Typography>
                      </Stack>
                      <Stack
                        onClick={() =>
                          handleViewType(
                            102,
                            formsDetails?.formSpec?.formSpecId,
                            empId
                          )
                        }
                      >
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
                        <Typography>
                          {(() => {
                            const matchingGroup = yesterdayCount?.find(
                              (group) =>
                                group.forms?.some(
                                  (form) =>
                                    form.formSpecId ===
                                    formsDetails?.formSpec?.formSpecId
                                )
                            );

                            const size = matchingGroup?.size ?? 0;

                            return (
                              <Typography component={"span"}>{size}</Typography>
                            );
                          })()}
                        </Typography>
                        <Typography
                          sx={{
                            textDecoration:
                              viewType === 102 ? "underline" : "none",
                            color:
                              viewType === 102 ? "orange !important " : "#000",
                          }}
                        >
                          filled Yestarday
                        </Typography>
                      </Stack>
                    </Stack>
                  )}

                  {(formsDetails?.approvalFormFlag === true ||
                    formsDetails?.approvalFormFlag === "true") && (
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
                      <Stack>
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
                        <Typography onClick={() => handleViewType(2)}>
                          0
                        </Typography>
                        <Typography
                          sx={{
                            textDecoration:
                              viewType === 2 ? "underline" : "none",
                            color:
                              viewType === 2 ? "orange !important " : "#000",
                          }}
                        >
                          PENDING
                        </Typography>
                      </Stack>
                      <Stack>
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
                        <Typography onClick={() => handleViewType(5)}>
                          0
                        </Typography>
                        <Typography
                          sx={{
                            textDecoration:
                              viewType === 5 ? "underline" : "none",
                            color:
                              viewType === 5 ? "orange !important " : "#000",
                          }}
                        >
                          PPENDING APPROVALS BY ME
                        </Typography>
                      </Stack>
                      <Stack>
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
                        <Typography onClick={() => handleViewType(4)}>
                          0
                        </Typography>
                        <Typography
                          sx={{
                            textDecoration:
                              viewType === 4 ? "underline" : "none",
                            color:
                              viewType === 4 ? "orange !important " : "#000",
                          }}
                        >
                          REJECTED
                        </Typography>
                      </Stack>{" "}
                      <Stack>
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
                        <Typography onClick={() => handleViewType(3)}>
                          0
                        </Typography>
                        <Typography
                          sx={{
                            textDecoration:
                              viewType === 3 ? "underline" : "none",
                            color:
                              viewType === 3 ? "orange !important " : "#000",
                          }}
                        >
                          APPROVED
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </Stack>
              <Stack sx={{}}>
                <ReusableTextfield
                  placeholder="search by identifier"
                  icon={<SearchIcon />}
                />
              </Stack>

              <Stack>
                <Typography
                  sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 500 }}
                >
                  {viewType === 101
                    ? "filled today"
                    : viewType === 102
                    ? "filled yesterday"
                    : ""}
                </Typography>
              </Stack>
              {formsDetails && formsDetails.approvalFormFlag === false && (
                <>
                  {formsDetails.forms.length === 0 ? (
                    <>
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: { xs: 12, sm: 14 },
                          py: 1.5,
                          background: "#fff",
                          mt: 1,
                          border: "1px solid #EBEBEB",
                        }}
                      >
                        No data found
                      </Typography>
                    </>
                  ) : (
                    <Stack sx={{ gap: 1 }}>
                      {formsDetails.forms.map((form) => (
                        <Stack sx={{ background: "#FFF", mt: 1 }}>
                          <Stack
                            sx={{
                              alignItems: "center",
                              justifyContent: "space-between",
                              flexDirection: "row",
                              px: 1,
                              py: 2,
                            }}
                          >
                            <Stack
                              sx={{
                                flexDirection: "row",
                                gap: 1,
                                alignItems: "center",
                              }}
                            >
                              <Typography>
                                <DescriptionIcon sx={{ color: "gray" }} />
                              </Typography>
                              <Stack sx={{ cursor: "pointer" }}>
                                <Typography
                                  sx={{ fontSize: "12px", color: "#000" }}
                                >
                                  {form.formId}:&nbsp;{form.identifier}&nbsp;
                                </Typography>
                                <Typography
                                  sx={{ fontSize: "10px", color: "#2e2e2e" }}
                                >
                                  {form.createdTime} | {form.filledByName}
                                </Typography>
                              </Stack>
                            </Stack>
                            <>
                              <EditIcon
                                sx={{
                                  color: "gray",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                }}
                              />
                            </>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </>
              )}
            </Stack>
          </Stack>
          <Stack sx={{ position: "fixed", bottom: 10, right: 10 }}>
            <Button
              onClick={handleNavToSubmitForm}
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
              submit form
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ViewForms;
