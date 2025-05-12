import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { todaysEmpLeave_ajax } from "../../api/Auth";
import { LeavesModuleMenu } from "../../components/leavesModule/Leaved_data";
const initialState = {
  LeavesModuleMenu: LeavesModuleMenu,
  status: "idle",
  error: null,
  data: {},
  onLeaveToday: [],
  onLeaveTodayStatus:"",
  isonLeaveTodayLoading :false
};
export const todayLeaveDetails = createAsyncThunk(
  "leaves/todayLeaveDetails",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(todaysEmpLeave_ajax, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch action required data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching action required data:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getLeavesData = createAsyncThunk(
  "leaves/fetchLeavesData",
  async (_viewType, { rejectWithValue }) => {
    let url = "http://localhost:8000/view/leaves/new/manager";
    const viewType = Number(_viewType);
    if (viewType === 4) {
      url = "http://localhost:8000/approve/api";
    } else if (viewType === 2) {
      url = "http://localhost:8000/view/leaves/new/manager";
    }

    try {
      const response = await fetch(url,{
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch leaves data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching leaves data:", error);
      return rejectWithValue(error.message);
    }
  }
);

const LeavesModule = createSlice({
  name: "LaeveModule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeavesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLeavesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLeavesData.rejected, (state, action) => {
        state.status = "failed";
       
      })
      .addCase(todayLeaveDetails.pending, (state) => {
        state.onLeaveTodayStatus = "loading";
        state.isonLeaveTodayLoading=true;
      })
      .addCase(todayLeaveDetails.fulfilled, (state, action) => {
        state.onLeaveTodayStatus = "succeeded";
        state.onLeaveToday = action.payload;
        state.isonLeaveTodayLoading =false;
      })
      .addCase(todayLeaveDetails.rejected, (state) => {
        state.onLeaveTodayStatus = "failed";
        state.isonLeaveTodayLoading =false
       
      });
  },
});

export default LeavesModule.reducer;
