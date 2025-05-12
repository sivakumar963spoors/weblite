import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleReportTitle } from "../../redux/slices/MobileReportSlice";

const AllReports = () => {
  const { ModileReportsList } = useSelector(
    (state) => state.MobileReportsModule
  );
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleNavigationToEachReport = (navTab, title) => {
    if (navTab === 0) {
      nav(`/mobile/reports/1200/1?isToday=false&actionToken=hiuhiujnl`);
    } else if (navTab === 1) {
      nav(`/mobile/reports/1200/1?isToday=true&actionToken=hiuhiujnl`);
    } else if (navTab === 2) {
      nav(`/mobile/report/user/trackDistanceReport`);
    } else if (navTab === 3) {
      nav(`/mobile/report/employee/activity/wise/summary/123/3`);
    } else if (navTab === 5) {
      nav(`/service/report/land/dayPlan/1323/3`);
    } else if (navTab === 6) {
      nav(`/report/employee/signin/signout/1777/4`);
    } else if (navTab === 8) nav(`/service/custom/activityReport/1223/3`);
    else if (navTab === 9) {
      nav(
        `/extraService/get/dayplan/planned/actual/visits/report/123/20`
      );
    }
    dispatch(toggleReportTitle(title));
  };
  return (
    <Box sx={{ mt: 8, background: "#FFFF" }}>
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          pt: 2,
        }}
      >
        {ModileReportsList.map((each, index) => (
          <Stack
            key={index}
            sx={{
              p: 2,
              background: "#FFF",
              boxShadow: "rgb(100 100 100 / 20%) 0px 0px 11px 0px",
              width: { sm: "450px", xs: "300px" },
              textAlign: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => handleNavigationToEachReport(index, each)}
          >
            <Typography
              sx={{
                fontSize: { sm: "14px", xs: "13px" },
                fontWeight: { sm: "550", xs: "500" },
              }}
            >
              {each}
            </Typography>
          </Stack>
        ))}
        <br></br>
      </Stack>
    </Box>
  );
};

export default AllReports;
