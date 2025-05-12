import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  actionRequired_ajax,
  actionRequired_Approvals,
  actionRequired_leaveRequests,
  actionRequired_worksList,
} from "../../api/Auth";

export const actionRequiredAjax = createAsyncThunk(
  "actionrequire/actionRequiredAjax",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(actionRequired_ajax, {
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
export const actionRequiredAjax_Getleaves = createAsyncThunk(
  "actionrequire/actionRequiredAjax_Getleaves",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(actionRequired_leaveRequests, {
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
export const actionRequiredAjax_Getworks = createAsyncThunk(
  "actionrequire/actionRequiredAjax_Getworks",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(actionRequired_worksList, {
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
export const actionRequiredAjax_GetApproval = createAsyncThunk(
  "actionrequire/actionRequiredAjax_GetApproval",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(actionRequired_Approvals, {
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
const ActionRequiredSlice = createSlice({
  name: "ActionRequired",
  initialState: {
    isLoadingApproval: false,
  isLoadingLeaves: false,
  isLoadingWork: false,
    status: "",
    actionRequiredDetails: [],
    leavesList: [],
    approvalList: [],
    workList: [],
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(actionRequiredAjax.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(actionRequiredAjax.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.actionRequiredDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(actionRequiredAjax.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(actionRequiredAjax_GetApproval.pending, (state) => {
        state.status = "loading";
        state.isLoadingApproval = true;
      })
      .addCase(actionRequiredAjax_GetApproval.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.approvalList = action.payload;
        state.isLoadingApproval = false;
      })
      .addCase(actionRequiredAjax_GetApproval.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(actionRequiredAjax_Getleaves.pending, (state) => {
        state.status = "loading";
        state.isLoadingLeaves = true;
      })
      .addCase(actionRequiredAjax_Getleaves.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leavesList = action.payload;
        state.isLoadingLeaves = false;
      })
      .addCase(actionRequiredAjax_Getleaves.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(actionRequiredAjax_Getworks.pending, (state) => {
        state.status = "loading";
        state.isLoadingWork = true;
      })
      .addCase(actionRequiredAjax_Getworks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workList = action.payload;
        state.isLoadingWork = false;
      })
      .addCase(actionRequiredAjax_Getworks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { getData } = ActionRequiredSlice.actions;
export default ActionRequiredSlice.reducer;
