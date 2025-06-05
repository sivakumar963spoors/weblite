import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DayPlannerModuleMenu } from "../../components/dayplanner/DayPlannerData";
import {
  getDayPlanCustomerUrl,
  getPlannedCustomersCount,
  getActualCustomerVisitsCount,
  getUnplannedCustomerVisitsCount,
  getTeamPlannedCustomersCount,
  getTeamUnplannedCustomerVisitsCount,
} from "../../api/Auth";
const initialState = {
  DayPlanModuleMenu: DayPlannerModuleMenu({}),
  menuItem: "",
  DayPlanCustomer: {},
  isDayPlanCustomer: false,
  plannedCount: 0,
  actualCount: 0,
  unplannedCount: 0,
  teamPlannedCount: 0,
  teamUnplannedCount: 0,
  loading: {
    planned: false,
    actual: false,
    unplanned: false,
    teamPlanned: false,
    teamUnplanned: false,
  },
  error: null,
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
// planned
export const fetchPlannedCustomersCount = createAsyncThunk(
  "dayPlan/fetchPlannedCustomersCount",
  async ({ allCustomers }, { rejectWithValue }) => {
    try {
      const response = await fetch(getPlannedCustomersCount(allCustomers), {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch planned count");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// visited

export const fetchActualCustomerVisitsCount = createAsyncThunk(
  "dayPlan/fetchActualCustomerVisitsCount",
  async ({ allCustomers, normal, forced }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        getActualCustomerVisitsCount(allCustomers, normal, forced),
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch actual visits count");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// unplanned visit
export const fetchUnplannedCustomerVisitsCount = createAsyncThunk(
  "dayPlan/fetchUnplannedCustomerVisitsCount",
  async ({ allCustomers, normal, forced }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        getUnplannedCustomerVisitsCount(allCustomers, normal, forced),
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch unplanned visits");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// team plan employee
export const fetchTeamPlannedCustomersCount = createAsyncThunk(
  "dayPlan/fetchTeamPlannedCustomersCount",
  async ({ allCustomers }, { rejectWithValue }) => {
    try {
      const response = await fetch(getTeamPlannedCustomersCount(allCustomers), {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch team planned count");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
// team unplanned employee
export const fetchTeamUnplannedCustomerVisitsCount = createAsyncThunk(
  "dayPlan/fetchTeamUnplannedCustomerVisitsCount",
  async ({ allCustomers, normal, forced }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        getTeamUnplannedCustomerVisitsCount(allCustomers, normal, forced),
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok)
        throw new Error("Failed to fetch team unplanned visits");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
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
      })
      // planned today
      .addCase(fetchPlannedCustomersCount.pending, (state) => {
        state.loading.planned = true;
      })
      .addCase(fetchPlannedCustomersCount.fulfilled, (state, action) => {
        state.plannedCount = action.payload;
        state.loading.planned = false;
      })
      .addCase(fetchPlannedCustomersCount.rejected, (state, action) => {
        state.loading.planned = false;
        state.error = action.payload;
      })
// visited
      .addCase(fetchActualCustomerVisitsCount.pending, (state) => {
        state.loading.actual = true;
      })
      
      .addCase(fetchActualCustomerVisitsCount.fulfilled, (state, action) => {
        state.actualCount = action.payload;
        state.loading.actual = false;
      })
      .addCase(fetchActualCustomerVisitsCount.rejected, (state, action) => {
        state.loading.actual = false;
        state.error = action.payload;
      })
// unplanned visits
      .addCase(fetchUnplannedCustomerVisitsCount.pending, (state) => {
        state.loading.unplanned = true;
      })
      .addCase(fetchUnplannedCustomerVisitsCount.fulfilled, (state, action) => {
        state.unplannedCount = action.payload;
        state.loading.unplanned = false;
      })
      .addCase(fetchUnplannedCustomerVisitsCount.rejected, (state, action) => {
        state.loading.unplanned = false;
        state.error = action.payload;
      })
// team planned employee
      .addCase(fetchTeamPlannedCustomersCount.pending, (state) => {
        state.loading.teamPlanned = true;
      })
      .addCase(fetchTeamPlannedCustomersCount.fulfilled, (state, action) => {
        state.teamPlannedCount = action.payload;
        state.loading.teamPlanned = false;
      })
      .addCase(fetchTeamPlannedCustomersCount.rejected, (state, action) => {
        state.loading.teamPlanned = false;
        state.error = action.payload;
      })
      // team unplanned employee

      .addCase(fetchTeamUnplannedCustomerVisitsCount.pending, (state) => {
        state.loading.teamUnplanned = true;
      })
      .addCase(
        fetchTeamUnplannedCustomerVisitsCount.fulfilled,
        (state, action) => {
          state.teamUnplannedCount = action.payload;
          state.loading.teamUnplanned = false;
        }
      )
      .addCase(
        fetchTeamUnplannedCustomerVisitsCount.rejected,
        (state, action) => {
          state.loading.teamUnplanned = false;
          state.error = action.payload;
        }
      );
  },
});
export default DayPlanModule.reducer;
export const { toggleMenuTitleDayPlan } = DayPlanModule.actions;
