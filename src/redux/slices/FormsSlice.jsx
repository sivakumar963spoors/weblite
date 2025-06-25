import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getfromAjaxUrl, getnewfromAjaxUrl } from "../../api/Auth";

const initialState = {
  formsDetails: {},
  loading: false,
  error: null,
  formsDetailsnew: {},
  isloadingnew: false,
  error: null,
};
export const fetchFormdata = createAsyncThunk(
  "homepage/fetchFormdata",
  async (params, thunkAPI) => {
    try {
      const response = await fetch(getfromAjaxUrl(params), {
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
export const fetchFormdatanew = createAsyncThunk(
  "homepage/fetchFormdatanew",
  async (params, thunkAPI) => {
    try {
      const response = await fetch(getnewfromAjaxUrl(params), {
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

const FormModule = createSlice({
  name: "FormsModule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormdata.fulfilled, (state, action) => {
        state.formsDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchFormdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFormdatanew.pending, (state) => {
        state.isloadingnew = true;
      })
      .addCase(fetchFormdatanew.fulfilled, (state, action) => {
        state.isloadingnew = false;
        state.formsDetailsnew = action.payload;
      
      })
      .addCase(fetchFormdatanew.rejected, (state, action) => {
        state.isloadingnew = false;
      });
  },
});
export default FormModule.reducer;
