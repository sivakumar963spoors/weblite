import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMyApprovals, getViewApprovals } from "../../api/Auth";
import { MyApprovalData } from "../../components/myapprovals/ApprovalData";

const initialState = {
  formData: {},
  loading: false,
  myapprovalData: MyApprovalData,
  error: null,

  viewStatusData: {},
  isViewStatusData: false,
  viewStatusError: "",
};

// Fetch single approval status view
export const getViewApprovalsdata = createAsyncThunk(
  "approval/getViewApprovalsdata",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(fetchMyApprovals(id), {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(
          errorData || { error: "Failed to fetch approval view data" }
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getViewApprovalsdata:", error);
      return thunkAPI.rejectWithValue({
        error: error?.message || "Network error or invalid response",
      });
    }
  }
);

// Fetch list of approvals
export const fetchFormAPproval = createAsyncThunk(
  "approval/fetchFormAPproval",
  async (params, thunkAPI) => {
    try {
      const response = await fetch(getViewApprovals(params), {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(
          errorData || { error: "Failed to fetch approval list" }
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchFormAPproval:", error);
      return thunkAPI.rejectWithValue({
        error: error?.message || "Network error or invalid response",
      });
    }
  }
);

// Approval Module Slice
const ApprovalModule = createSlice({
  name: "ApprovalModule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch list of approvals
      .addCase(fetchFormAPproval.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFormAPproval.fulfilled, (state, action) => {
        state.formData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFormAPproval.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Unknown error occurred";
      })

      // View approval status of a specific form
      .addCase(getViewApprovalsdata.pending, (state) => {
        state.isViewStatusData = true;
        state.viewStatusError = "";
      })
      .addCase(getViewApprovalsdata.fulfilled, (state, action) => {
        state.viewStatusData = action.payload;
        state.isViewStatusData = false;
        state.viewStatusError = "";
      })
      .addCase(getViewApprovalsdata.rejected, (state, action) => {
        state.isViewStatusData = false;
        state.viewStatusError = action.payload?.error || "Failed to load form status";
        console.log(action.payload)

      });
  },
});

export default ApprovalModule.reducer;
