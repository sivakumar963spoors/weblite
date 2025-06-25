import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getfromAjaxUrl,
  getnewfromAjaxUrl,
  getnewworksAjaxUrl,
} from "../../api/Auth";

const initialState = {
  worksDetailsnew: {},
  isloadingnew: false,
  error: null,
};

export const fetchWorkdatanew = createAsyncThunk(
  "homepage/fetchWorkdatanew",
  async (params, thunkAPI) => {
    try {
      const response = await fetch(getnewworksAjaxUrl(params), {
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

const WorkSpecModule = createSlice({
  name: "WorkSpecModuleData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchWorkdatanew.pending, (state) => {
        state.isloadingnew = true;
      })
      .addCase(fetchWorkdatanew.fulfilled, (state, action) => {
        state.isloadingnew = false;
        state.worksDetailsnew = action.payload;
       
      })
      .addCase(fetchWorkdatanew.rejected, (state, action) => {
        state.isloadingnew = false;
      });
  },
});
export default WorkSpecModule.reducer;
