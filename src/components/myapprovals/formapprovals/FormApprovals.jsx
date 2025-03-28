import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PaymentsIcon from "@mui/icons-material/Payments";
import PrintIcon from "@mui/icons-material/Print";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { sm: 400, xs: 250 },
  bgcolor: "background.paper",

  p: 2,
  borderRadius: "5px",
  height: 400,
};

const FormApprovals = () => {
  const [accordianClick, setAccordianClick] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [submissionInfoClick, setSubmissionInfoClick] = useState(false);
  const [approvalHistory, setApprovalHistory] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [requisitionStatus, setRequisitions] = useState(false);
  const formData = useSelector((state) => state.ApprovalModule.formData);
  const myapprovalData = useSelector(
    (state) => state.ApprovalModule.myapprovalData
  );
  const handleToggleClick = () => {
    setAccordianClick(!accordianClick);
  };
  const handleApprovalStatus = () => {
    setApprovalStatus(!approvalStatus);
  };
  const handleSubmissinInfo = () => {
    setSubmissionInfoClick(!submissionInfoClick);
  };
  const handleApprovalHistory = () => {
    setApprovalHistory(!approvalHistory);
  };
  const handleRequisitions = () => {
    setRequisitions(!requisitionStatus);
  };
  return (
    <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
      <Stack
        sx={{ width: "95%", border: "1px solid #E3E3E3", borderRadius: "5px" }}
      >
        <Stack sx={{ p: 3 }}>
          <Typography
            sx={{
              fontSize: { sm: "15px", xs: "12px" },
              color: "#8898AA",
              fontWeight: "bold",
            }}
          >
            Hierarachy based immeidate manager
          </Typography>
          <Stack
            sx={{
              flexDirection: { sm: "row", xs: "column" },
              alignItems: "center",
              gap: 2,
              mt: 2,
              "&>*": {
                width: { sm: "50% !important", xs: "100% !important" },
              },
              "& > * > :first-of-type": {
                fontSize: { sm: "15px", xs: "12px" },
                color: "#7B7B7B",
              },
              "& > * > :nth-of-type(2)": {
                fontSize: { sm: "13px", xs: "12px" },
              },
            }}
          >
            <Stack>
              <Typography>last modified time</Typography>
              <Typography>2025-02-14 12:20:00 PM</Typography>
            </Stack>
            <Stack>
              <Typography>last modified by</Typography>
              <Typography>sahana katta</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            p: 1,
            gap: 2,
            "& > * > *": {
              flexDirection: "row",
              border: "1px solid #DEDEDE",
              background: "#FAFAFA",
              py: 0.5,
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
            },

            "& > * > * >:first-of-type": {
              fontSize: { sm: "15px", xs: "10px" },
              color: "#777",
            
            },
            "& > * > *>:nth-of-type(2)": {
              fontSize: { sm: "12px", xs: "10px" },
              fontWeight: "600",
            },
          }}
        >
          <Stack>
            <Stack onClick={handleToggleClick}>
              <Typography>
                {accordianClick ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </Typography>
              <Typography>form data</Typography>
            </Stack>
            {accordianClick && (
              <Stack
                sx={{ background: "#FFF !important", textAlign: "center" }}
              >
                <Typography>form data</Typography>
              </Stack>
            )}
          </Stack>{" "}
          <Stack>
            <Stack onClick={handleApprovalStatus}>
              <Typography>
                {approvalStatus ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </Typography>
              <Typography>Approval status</Typography>
            </Stack>
            {approvalStatus && (
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  background: "#FFF !important",
                  alignItems: "center",

                  p: 1,
                  "&>*": {},
                  "& > *>: first-of-type": {
                    color: "#777",
                    fontSize: {
                      sm: "12px",
                      xs: "10px",
                    },
                  },
                  "& > *>: nth-of-type(2)": {
                    color: "#000",
                    fontSize: {
                      sm: "12px",
                      xs: "10px",
                    },
                  },
                }}
              >
                <Stack>
                  <Typography>Approval status</Typography>
                  <Typography>Approved</Typography>
                </Stack>
                <Stack onClick={handleOpen} sx={{ cursor: "pointer" }}>
                  <Typography>payment</Typography>
                  <Typography sx={{ textAlign: "center" }}>
                    <PaymentsIcon />
                  </Typography>
                </Stack>{" "}
                <Stack>
                  <Typography>print status</Typography>
                  <Typography sx={{ textAlign: "center" }}>
                    <PrintIcon />
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>{" "}
          <Stack>
            <Stack>
              <Typography>
                {accordianClick ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </Typography>
              <Typography>Location & additional details</Typography>
            </Stack>
          </Stack>{" "}
          <Stack>
            <Stack onClick={handleSubmissinInfo}>
              <Typography>
                {submissionInfoClick ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </Typography>
              <Typography>submission information</Typography>
            </Stack>
            {submissionInfoClick && (
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  p: 1,
                  gap: 2,
                  background: "#FFF !important",
                  "& > *": {},
                  "& > *>: first-of-type": {
                    color: "#777",
                    fontSize: {
                      sm: "12px",
                      xs: "10px",
                    },
                  },
                  "& > *>: nth-of-type(2)": {
                    color: "#000",
                    fontSize: {
                      sm: "12px",
                      xs: "10px",
                    },
                  },
                }}
              >
                <Stack>
                  <Typography>workflow :</Typography>
                  <Typography>test approval</Typography>
                </Stack>
                <Stack>
                  <Typography>submitted by :</Typography>
                  <Typography>sahana</Typography>
                </Stack>{" "}
                <Stack>
                  <Typography>submitted on :</Typography>
                  <Typography>2025-02-14 12:09:30 PM</Typography>
                </Stack>
                <Stack>
                  <Typography>status</Typography>
                  <Typography>approved</Typography>
                </Stack>
              </Stack>
            )}
          </Stack>{" "}
          <Stack>
            <Stack onClick={handleApprovalHistory}>
              <Typography>
                {approvalHistory ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </Typography>
              <Typography>approval history</Typography>
            </Stack>
            {approvalHistory && (
              <Stack
                sx={{
                  background: "#FFF !important",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    p: 1,
                    gap: 2,
                    border: "",
                    "&>*": {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  }}
                >
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ border: "1px solid #ddd" }}>
                          <TableCell
                            sx={{
                              border: "1px solid #ddd",
                              fontSize: { sm: "12px", xs: "8px" },
                              width: "50%",
                              lineHeight: "10px",
                            }}
                          >
                            <Stack>
                              <Typography>stage :</Typography>
                              <Typography> approval</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell
                            sx={{
                              border: "1px solid #ddd",
                              fontSize: { sm: "12px", xs: "10px" },
                            }}
                          >
                            <Stack>
                              <Typography>bootstrap approval</Typography>
                              <Typography>ok</Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      <TableRow sx={{ border: "1px solid #ddd" }}>
                          <TableCell
                            sx={{
                              border: "1px solid #ddd",
                              fontSize: { sm: "12px", xs: "8px" },
                              width: "50%",
                              lineHeight: "10px",
                            }}
                          >
                            <Stack>
                            <Typography>approved by :</Typography>
                            <Typography>avula venkatesh</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell
                            sx={{
                              border: "1px solid #ddd",
                              fontSize: { sm: "12px", xs: "10px" },
                            }}
                          >
                            <Stack>
                            <Typography>approved on :</Typography>
                            <Typography>2025-02-14 12:22:14 PM</Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ border: "1px solid #ddd" }}>
                          <TableCell
                            sx={{
                              border: "1px solid #ddd",
                              fontSize: { sm: "12px", xs: "8px" },
                              width: "50%",
                              lineHeight: "10px",
                            }}
                          >
                            <Stack>
                            <Typography>Remark :</Typography>
                            <Typography></Typography>
                            </Stack>
                          </TableCell>
                          <TableCell
                            sx={{
                              border: "1px solid #ddd",
                              fontSize: { sm: "12px", xs: "10px" },
                            }}
                          >
                            <Stack>
                            <Typography>submitted for reason:</Typography>
                            <Typography></Typography>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                 
                </Stack>
              </Stack>
            )}
          </Stack>{" "}
          <Stack>
            <Stack onClick={handleRequisitions}>
              <Typography>
                {requisitionStatus ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </Typography>
              <Typography>requisition status</Typography>
            </Stack>
            {requisitionStatus && (
              <Stack>
                <TableContainer sx={{ p: 1 }}>
                  <Table sx={{ border: "1px solid #000", p: 1 }}>
                    <TableHead>
                      <TableRow sx={{ border: "1px solid #ddd" }}>
                        <TableCell
                          sx={{
                            border: "1px solid #ddd",
                            fontSize: { sm: "12px", xs: "8px" },
                            width: "50%",
                            lineHeight: "10px",
                          }}
                        >
                          workflow form approval status
                        </TableCell>
                        <TableCell
                          sx={{
                            border: "1px solid #ddd",
                            fontSize: { sm: "12px", xs: "10px" },
                          }}
                        >
                          Approved
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #aaaaaa",
                p: 1,
                borderRadius: "5px",
                background:
                  "#cccccc url(images/ui-bg_highlight-soft_75_cccccc_1x100.png) 50% 50% repeat-x",
              }}
            >
              <Typography
                sx={{
                  fontWeight: { sm: "bold", xs: 500 },
                  fontSize: { sm: "12px", xs: "10px" },
                }}
              >
                payment information
              </Typography>

              <CloseIcon
                sx={{ fontSize: "15px", cursor: "pointer" }}
                onClick={handleClose}
              />
            </Stack>
            <Typography
              sx={{
                mt: 2,
                color: "#aaa",
                fontSize: { sm: "12px", xs: "10px" },
              }}
            >
              this payment is not processed yet
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default FormApprovals;
