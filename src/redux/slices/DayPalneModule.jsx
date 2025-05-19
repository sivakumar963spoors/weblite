import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DayPlannerModuleMenu } from "../../components/dayplanner/DayPlannerData";
import { getDayPlanCustomerUrl } from "../../api/Auth";
const initialState = {
  DayPlanModuleMenu: DayPlannerModuleMenu,
  menuItem: "",
  DayPlanCustomer: {},
  isDayPlanCustomer: false,
};
export const fetch_getDayPlanCustomerUrl = createAsyncThunk(
  "DayPlanModule/fetch_getDayPlanCustomerUrl",
  async () => {
    try {
      const response = await fetch(getDayPlanCustomerUrl, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {}
  }
);
const DayPlanModule = createSlice({
  name: "DayPlanModule",
  initialState,
  reducers: {
    toggleMenuTitleDayPlan: (state, action) => {
      state.menuItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch_getDayPlanCustomerUrl.pending, (state) => {
        state.isDayPlanCustomer = true;
      })
      .addCase(fetch_getDayPlanCustomerUrl.fulfilled, (state, action) => {
        state.DayPlanCustomer = action.payload;
        state.isDayPlanCustomer = false;
      })
      .addCase(fetch_getDayPlanCustomerUrl.rejected, (state) => {
        state.isDayPlanCustomer = false;
      });
  },
});
export default DayPlanModule.reducer;
export const { toggleMenuTitleDayPlan } = DayPlanModule.actions;
