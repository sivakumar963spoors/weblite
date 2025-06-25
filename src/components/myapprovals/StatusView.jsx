import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getViewApprovalsdata } from "../../redux/slices/ApprovalSlice";
import DottedSpinner from "../common/DottedSpinner";
import accessdenied from "../../assets/svg/accessdenied.svg";
const StatusView = () => {
  const { viewStatusData, isViewStatusData, viewStatusError } = useSelector(
    (state) => state.ApprovalModule
  );

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      console.log("Calling getViewApprovalsdata with id:", id); // <--- check this in DevTools
      dispatch(getViewApprovalsdata(id));
    }
  }, [dispatch, id]);

  return (
    <Box sx={{ mt: 10, position: "relative" }}>
      {/* Header Title */}
      <Stack
        sx={{ position: "absolute", mt: -7, zIndex: 99999999, ml: "50px" }}
      >
        <Typography sx={{ color: "#FFF" }}>
          {viewStatusData?.isWebLiteView && viewStatusData?.formSpec?.formTitle
            ? `${
                viewStatusData.formSpec.formTitle.length > 20
                  ? viewStatusData.formSpec.formTitle.slice(0, 20) + "..."
                  : viewStatusData.formSpec.formTitle
              } Workflow`
            : "Approval status"}
        </Typography>
      </Stack>

      {/* Loading Spinner */}
      {isViewStatusData ? (
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
      ) : viewStatusError ? (
        // Show error
        <Stack sx={{ mt: 10, alignItems: "center", width: "300px" }}>
          <Box component={"img"} src={accessdenied} />
        </Stack>
      ) : viewStatusData && viewStatusData.workflowFormStatusHistories ? (
        // Show Data
        <Stack sx={{ width: "100%", p: 1 }}>
          <Typography
            sx={{
              fontSize: { sm: "14px", xs: "12px" },
              fontWeight: 500,
              mb: 1,
            }}
          >
            Approval history
          </Typography>

          {viewStatusData?.workflowFormStatusHistories?.length === 0 ? (
            <Typography>No data found</Typography>
          ) : (
            <Stack sx={{ gap: 0.5 }}>
              {viewStatusData.workflowFormStatusHistories.map(
                (workflowHistory, index) => (
                  <Stack
                    key={index}
                    sx={{
                      mb: 1,
                      p: 1,
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography>
                      Stage: {workflowHistory.workFlowStage}
                    </Typography>

                    {/* Approved / In Progress */}
                    {(workflowHistory.status === 0 ||
                      workflowHistory.status === 1) && (
                      <Stack>
                        <Typography>
                          Approved by: {workflowHistory.approvedEmp}
                        </Typography>
                        <Typography>
                          Approved On: {workflowHistory.approvedTimeLTZ}
                        </Typography>
                      </Stack>
                    )}

                    {/* Rejected */}
                    {workflowHistory.status === -1 && (
                      <Stack>
                        {workflowHistory.statusMessage?.startsWith(
                          "Rejected by the system"
                        ) ? (
                          <Typography>
                            Rejected by: {workflowHistory.statusMessage}
                            &nbsp;&nbsp; Rejected On:{" "}
                            {workflowHistory.approvedTimeLTZ}
                          </Typography>
                        ) : (
                          <Typography>
                            Rejected by: {workflowHistory.approvedEmp}
                            &nbsp;&nbsp; Rejected On:{" "}
                            {workflowHistory.approvedTimeLTZ}
                          </Typography>
                        )}
                      </Stack>
                    )}

                    {/* Resubmitted */}
                    {workflowHistory.status === 2 && (
                      <Stack>
                        <Typography>
                          Resubmitted by: {workflowHistory.approvedEmp}
                          &nbsp;&nbsp; Resubmitted On:{" "}
                          {workflowHistory.approvedTimeLTZ}
                        </Typography>
                      </Stack>
                    )}

                    {/* Cancelled */}
                    {workflowHistory.status === 3 && (
                      <Stack>
                        {workflowHistory.statusMessage ===
                        "Cancelled by the system" ? (
                          <Typography>
                            Cancelled by: Cancelled by the system &nbsp;&nbsp;
                            Cancelled On: {workflowHistory.approvedTimeLTZ}
                          </Typography>
                        ) : (
                          <Typography>
                            Cancelled by: {workflowHistory.approvedEmp}
                            &nbsp;&nbsp; Cancelled On:{" "}
                            {workflowHistory.approvedTimeLTZ}
                          </Typography>
                        )}
                      </Stack>
                    )}

                    {/* Remarks */}
                    <Typography>
                      Remarks:{" "}
                      {workflowHistory.status === 2
                        ? "Resubmitted"
                        : workflowHistory.remarks}
                    </Typography>
                  </Stack>
                )
              )}
            </Stack>
          )}
        </Stack>
      ) : (
        // Fallback: no data and no error (shouldn’t usually happen)
        <Typography sx={{ mt: 10, textAlign: "center" }}>
          Nothing to display
        </Typography>
      )}
    </Box>
  );
};

export default StatusView;
