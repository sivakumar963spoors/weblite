import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  approvedLeaves,
  getAddLeaveData,
  getLeavesByTypes,
  getLeavesByTypesForCount,
  getWithDrawLeave,
  pendingApprovals,
  rejectedLeaves,
  todaysEmpLeave_ajax,
  totalMyLeavesSize,
  totalTeamLeavesSize,
} from "../../api/Auth";
import { LeavesModuleMenu } from "../../components/leavesModule/Leaved_data";
const initialState = {
  LeavesModuleMenu: LeavesModuleMenu,
  status: "idle",
  error: null,
  data: {},
isfetchgetWithDrawLeave:false,
fetchgetWithDrawLeaveData:{},
  dataEmpCount: {},
  onLeaveToday: [],
  onLeaveTodayStatus: "",
  isonLeaveTodayLoading: false,
  pendingApprovals: 0,
  totalMyLeaves: 0,
  totalTeamLeaves: 0,
  approvedLeaves: 0,
  rejectedLeaves: 0,
  isPendingApprovals: false,
  isTotalMyLeaves: false,
  isTotalTeamLeaves: false,
  isApprovedLeaves: false,
  isRejectedLeaves: false,
  errorPendingApprovals: null,
  errorTotalMyLeaves: null,
  errorTotalTeamLeaves: null,
  errorApprovedLeaves: null,
  errorRejectedLeaves: null,
  isdataEmpCount: false,
  fetchgetAddLeaveDataDetails: {},
  isfetchgetAddLeaveData: false,
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
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch(getLeavesByTypes(params), {
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
export const getLeavesDataForCount = createAsyncThunk(
  "leaves/getLeavesDataForCount",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch(getLeavesByTypesForCount(params), {
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
export const fetchPendingApprovals = createAsyncThunk(
  "leaves/fetchPendingApprovals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(pendingApprovals, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch pending approvals");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTotalMyLeaves = createAsyncThunk(
  "leaves/fetchTotalMyLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(totalMyLeavesSize, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch my leaves");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchTotalTeamLeaves = createAsyncThunk(
  "leaves/fetchTotalTeamLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(totalTeamLeavesSize, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch team leaves");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchApprovedLeaves = createAsyncThunk(
  "leaves/fetchApprovedLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(approvedLeaves, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch approved leaves");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchRejectedLeaves = createAsyncThunk(
  "leaves/fetchRejectedLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(rejectedLeaves, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch rejected leaves");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const fetchgetAddLeaveData = createAsyncThunk(
  "leaves/fetchgetAddLeaveData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(getAddLeaveData, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch rejected leaves");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// withd
export const fetchgetWithDrawLeave = createAsyncThunk(
  "leaves/fetchgetWithDrawLeave",
  async (payload, { rejectWithValue }) => {
    try {
      const url = getWithDrawLeave(payload);
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to withdraw leave");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const LeavesModule = createSlice({
  name: "LaeveModule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
 .addCase(fetchgetWithDrawLeave.pending, (state) => {
        state.isfetchgetWithDrawLeave = true;
      })
      .addCase(fetchgetWithDrawLeave.fulfilled, (state, action) => {
        state.fetchgetWithDrawLeaveData = action.payload;
        state.isfetchgetWithDrawLeave = false;
      })
      .addCase(fetchgetWithDrawLeave.rejected, (state, action) => {
        state.isfetchgetWithDrawLeave = false;
      })
      .addCase(fetchgetAddLeaveData.pending, (state) => {
        state.isfetchgetAddLeaveData = true;
      })
      .addCase(fetchgetAddLeaveData.fulfilled, (state, action) => {
        state.fetchgetAddLeaveDataDetails = action.payload;
        state.isfetchgetAddLeaveData = false;
      })
      .addCase(fetchgetAddLeaveData.rejected, (state, action) => {
        state.isfetchgetAddLeaveData = false;
      })
      .addCase(getLeavesData.pending, (state) => {})
      .addCase(getLeavesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getLeavesData.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getLeavesDataForCount.pending, (state) => {
        state.isdataEmpCount = true;
      })
      .addCase(getLeavesDataForCount.fulfilled, (state, action) => {
        state.dataEmpCount = action.payload;
        state.isdataEmpCount = false;
      })
      .addCase(getLeavesDataForCount.rejected, (state, action) => {
        state.isdataEmpCount = false;
      })
      .addCase(todayLeaveDetails.pending, (state) => {
        state.onLeaveTodayStatus = "loading";
        state.isonLeaveTodayLoading = true;
      })
      .addCase(todayLeaveDetails.fulfilled, (state, action) => {
        state.onLeaveTodayStatus = "succeeded";
        state.onLeaveToday = action.payload;
        console.log(action.payload);
        state.isonLeaveTodayLoading = false;
      })
      .addCase(todayLeaveDetails.rejected, (state) => {
        state.onLeaveTodayStatus = "failed";
        state.isonLeaveTodayLoading = false;
      })

      // --- Pending Approvals ---
      .addCase(fetchPendingApprovals.pending, (state) => {
        state.isPendingApprovals = true;
        state.errorPendingApprovals = null;
      })
      .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
        state.pendingApprovals = action.payload;
        state.isPendingApprovals = false;
      })
      .addCase(fetchPendingApprovals.rejected, (state, action) => {
        state.isPendingApprovals = false;
        state.errorPendingApprovals = action.payload;
      })

      // --- Total My Leaves ---
      .addCase(fetchTotalMyLeaves.pending, (state) => {
        state.isTotalMyLeaves = true;
        state.errorTotalMyLeaves = null;
      })
      .addCase(fetchTotalMyLeaves.fulfilled, (state, action) => {
        state.totalMyLeaves = action.payload;
        state.isTotalMyLeaves = false;
      })
      .addCase(fetchTotalMyLeaves.rejected, (state, action) => {
        state.isTotalMyLeaves = false;
        state.errorTotalMyLeaves = action.payload;
      })

      // --- Total Team Leaves ---
      .addCase(fetchTotalTeamLeaves.pending, (state) => {
        state.isTotalTeamLeaves = true;
        state.errorTotalTeamLeaves = null;
      })
      .addCase(fetchTotalTeamLeaves.fulfilled, (state, action) => {
        state.totalTeamLeaves = action.payload;
        state.isTotalTeamLeaves = false;
      })
      .addCase(fetchTotalTeamLeaves.rejected, (state, action) => {
        state.isTotalTeamLeaves = false;
        state.errorTotalTeamLeaves = action.payload;
      })

      // --- Approved Leaves ---
      .addCase(fetchApprovedLeaves.pending, (state) => {
        state.isApprovedLeaves = true;
        state.errorApprovedLeaves = null;
      })
      .addCase(fetchApprovedLeaves.fulfilled, (state, action) => {
        state.approvedLeaves = action.payload;
        state.isApprovedLeaves = false;
      })
      .addCase(fetchApprovedLeaves.rejected, (state, action) => {
        state.isApprovedLeaves = false;
        state.errorApprovedLeaves = action.payload;
      })

      // --- Rejected Leaves ---
      .addCase(fetchRejectedLeaves.pending, (state) => {
        state.isRejectedLeaves = true;
        state.errorRejectedLeaves = null;
      })
      .addCase(fetchRejectedLeaves.fulfilled, (state, action) => {
        state.rejectedLeaves = action.payload;
        state.isRejectedLeaves = false;
      })
      .addCase(fetchRejectedLeaves.rejected, (state, action) => {
        state.isRejectedLeaves = false;
        state.errorRejectedLeaves = action.payload;
      });
  },
});

export default LeavesModule.reducer;
