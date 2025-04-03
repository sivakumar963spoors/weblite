import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams} from "react-router-dom";
import { getLeavesData } from "../../redux/slices/LeavesModule";
const LeavesDetails = () => {
  const entityId=useParams();
const dispatch =useDispatch();
  const {  data } = useSelector(
    (state) => state.LeavesModule
  );  useEffect(() => {
      dispatch(getLeavesData(entityId));
    }, [dispatch,entityId]);
    const detailedLeaves = data?.leaves?.filter(leave => leave.empId === entityId);
    console.log("Filtered Leaves for Employee:", detailedLeaves)
// const leavesMap = JSON.parse(data?.leavesMap || "{}");
// const detailedLeaves = Object.values(leavesMap).filter(leave => leave.empId === entityId);
// console.log("Detailed Leaves:", detailedLeaves);

  return (
    <Box sx={{ mt: 10 }}>
      <Stack sx={{ alignItems: "center" }}>
        <Stack
          sx={{
            width: "85%",
            borderRadius: "10px",
            boxShadow: "0 0 25px rgb(23 23 23 / 11%)",
            px: 2,
          }}
        >
          <Typography sx={{ color: "#244f64", fontWeight: "bold", my: 2 }}>
            Leave Deatils
          </Typography>
          {detailedLeaves.length > 0 ? (
  detailedLeaves.map((leave) => (
          <Stack
            sx={{
              "& > *": {
                flexDirection: { md: "row", sm: "column" },
              },
              "& > * > :first-of-type": {
                width: { md: "50%", xs: "100%" },

                fontSize: "12px",
                fontWeight: 400,
                color: "#0D3443", // Applies color only to the first Typography inside each Stack
              },
              "& > * > :nth-of-type(2)": {
                mb: 1,
                width: { md: "50%", xs: "100%" },
                fontSize: "14px",
                color: "#333", // Applies color only to the second Typography inside each Stack
              },
            }}
          >
            <Stack sx={{ flexDirection: { md: "row", sm: "column" } }}>
              <Typography>Employee :</Typography>
              <Typography>{leave.empName}</Typography>
            </Stack>
            <Stack>
              <Typography>Applied on :</Typography>
              <Typography>{leave.createTime}</Typography>
            </Stack>{" "}
            <Stack>
              <Typography> from :</Typography>
              <Typography>{leave.formDateTime}</Typography>
            </Stack>{" "}
            <Stack>
              <Typography>To :</Typography>
              <Typography>{leave.toDateTime}</Typography>
            </Stack>{" "}
            <Stack>
              <Typography> leave type :</Typography>
              <Typography>{leave.leaveTypeName}</Typography>
            </Stack>{" "}
            <Stack>
              <Typography>actual quota</Typography>
              <Typography></Typography>
            </Stack>
            <Stack>
              <Typography>present available quota</Typography>
              <Typography></Typography>
            </Stack>
            <Stack>
              <Typography>available quota during leave applied</Typography>
              <Typography></Typography>
            </Stack>
            <Stack>
              <Typography>total days</Typography>
              <Typography></Typography>
            </Stack>
            <Stack>
              <Typography>status</Typography>
              <Typography>{leave.leaveStatus || "Pending"}</Typography>
            </Stack>
            <Stack>
              <Typography>Employee {leave.empName} remark</Typography>
              <TextField multiline rows={3} />
            </Stack>
            <Stack>
              <Typography>manager remark</Typography>
              <TextField multiline rows={3} />
            </Stack>
          </Stack> ))
) : (
  <Typography>No leaves found for this employee.</Typography>
)}

        </Stack>
      </Stack>
      <Stack
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#fff",
          zIndex: 9999,
          boxShadow: "2px -4px 14px -10px rgb(0 0 0 / 65%)",
        }}
      >
        <Stack
          sx={{
            alignContent: "flex-end",
            alignItems: "flex-end",
            my: 2,
            mr: 2,
          }}
        >
          {" "}
          <Button variant="contained" sx={{ width: "100px" }}>
            ok
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LeavesDetails;
