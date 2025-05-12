import { createSlice } from "@reduxjs/toolkit";
import { mobileReportsList } from "../../components/reports/ReportData";

const initialState = {
  ModileReportsList: mobileReportsList,
  mobileReportTitle: "",
};
const MobileReportSlice = createSlice({
  name: "MobileReportsModule",
  initialState,
  reducers: {
    toggleReportTitle: (state, action) => {
      state.mobileReportTitle = action.payload;
    },
  },
});
export const { toggleReportTitle } = MobileReportSlice.actions;
export default MobileReportSlice.reducer;
