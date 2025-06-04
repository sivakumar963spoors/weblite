import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loadActionableWorksByMeURl,
  loadFormApprovalsCountByManager,
  loadFormApprovalsCountByMe,
  loadHomeScreenCards_ajax,
  loadInActiveWorks,
  loadWorkSpecCardsCounturl,
  loadWorkSpecPendingInvitationByMeUrl,
  loadWorkSpecPendingInvitationByTeamUrl,
  loggedInUser_ajax,
  todayCountUrl,
  yestardayCountUrl,
} from "../../api/Auth";
import { workSpecsData } from "../../components/task/TaskData";

const initialState = {
  workSpecsDataMenu: workSpecsData,
  LoadHomeScreenCards: [],
  status: "",
  isLoadHomeScreenCards: false,
  loggedInUser: {},
  filteredHomePageData: [],
  yesterdayCount: [],
  todayCount: [],
  loading: false,
  error: null,
  loadActionableWorksByMe: [],
  workSpecCards: [],
  pendingByMe: [],
  pendingByTeam: [],
  inactiveWorks: [],
  loadFormApprovalsCountByMe_byMe: [],
  loadFormApprovalsCountByManager_byManager: [],
};
export const loggedInUser_get = createAsyncThunk(
  "homepage/loggedInUser_get",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(loggedInUser_ajax, {
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

export const loadHomeScreenCards_get = createAsyncThunk(
  "homepage/loadHomeScreenCards_get",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(loadHomeScreenCards_ajax, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch action required data");
      }

      const data = await response.json();
      return data.menuItems;
    } catch (error) {
      console.error("Error fetching action required data:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchYesterdayCount = createAsyncThunk(
  "formCounts/fetchYesterdayCount",
  async (empId, { rejectWithValue }) => {
    try {
      
      const response = await fetch(yestardayCountUrl(empId), {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json(); 

      
      if (!data.day) {
        throw new Error("Invalid response data");
      }

     
      return data.day;
    } catch (error) {
      return rejectWithValue("Error fetching yesterday's form counts");
    }
  }
);


export const fetchTodayCount = createAsyncThunk(
  "formCounts/fetchTodayCount",
  async (empId, { rejectWithValue }) => {
    try {
      const response = await fetch(
       todayCountUrl(empId),
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!data.day) {
        throw new Error("Invalid response data");
      }

      return data.day;
    } catch (error) {
      return rejectWithValue("Error fetching today's form counts");
    }
  }
);
//you need to do
export const Get_loadActionableWorksByMe = createAsyncThunk(
  "homepage/Get_loadActionableWorksByMe",
  async (empId, { rejectWithValue }) => {
    try {
      const response = await fetch(loadActionableWorksByMeURl, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch action required data");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue("Error fetching today's form counts");
    }
  }
);

// team need to do
export const fetchWorkSpecCards = createAsyncThunk(
  "workSpecs/fetchCards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(loadWorkSpecCardsCounturl, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch workSpec cards");
    }
  }
);
// invitation need to you
export const fetchPendingInvitationsByMe = createAsyncThunk(
  "workSpecs/fetchPendingByMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(loadWorkSpecPendingInvitationByMeUrl, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch pending invitations by me");
    }
  }
);
// invitations need by team
export const fetchPendingInvitationsByTeam = createAsyncThunk(
  "workSpecs/fetchPendingByTeam",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(loadWorkSpecPendingInvitationByTeamUrl, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch pending invitations by team");
    }
  }
);
// no progress
export const fetchInactiveWorks = createAsyncThunk(
  "workSpecs/fetchInactive",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(loadInActiveWorks, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("Failed to fetch inactive works");
    }
  }
);
export const fetchFormApprovalsCountByMe = createAsyncThunk(
  "formApprovals/fetchByMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(loadFormApprovalsCountByMe, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch approvals by me");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//
export const fetchFormApprovalsCountByManager = createAsyncThunk(
  "formApprovals/fetchByManager",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(loadFormApprovalsCountByManager, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch approvals by manager");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const HomePageModule = createSlice({
  name: "HomePageModule",
  initialState,
  reducers: {
    filterByModule: (state, action) => {
      const searchText = action.payload
        ? action.payload.toLowerCase().trim()
        : "";

      if (!searchText) {
        state.filteredHomePageData = state.LoadHomeScreenCards;
        return;
      }

      state.filteredHomePageData = state.LoadHomeScreenCards.filter((item) =>
        item.moduleName && typeof item.moduleName === "string"
          ? item.moduleName.toLowerCase().includes(searchText)
          : false
      );

      if (state.filteredHomePageData.length === 0) {
      }
    },
    resetFilteredData: (state) => {
      state.filteredHomePageData = state.LoadHomeScreenCards;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loggedInUser_get.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loggedInUser_get.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedInUser = action.payload;
      })
      .addCase(loggedInUser_get.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(loadHomeScreenCards_get.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadHomeScreenCards_get.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.LoadHomeScreenCards = action.payload;
      })
      .addCase(loadHomeScreenCards_get.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchYesterdayCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchYesterdayCount.fulfilled, (state, action) => {
        state.loading = false;
        state.yesterdayCount = action.payload;
      })

      .addCase(fetchYesterdayCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTodayCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTodayCount.fulfilled, (state, action) => {
        state.loading = false;
        state.todayCount = action.payload;
      })

      .addCase(fetchTodayCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // works you need to do 37
      .addCase(Get_loadActionableWorksByMe.pending, (state) => {})

      .addCase(Get_loadActionableWorksByMe.fulfilled, (state, action) => {
        state.loadActionableWorksByMe = action.payload;
      })

      .addCase(Get_loadActionableWorksByMe.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchWorkSpecCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkSpecCards.fulfilled, (state, action) => {
        state.loading = false;
        state.workSpecCards = action.payload;
      })
      .addCase(fetchWorkSpecCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pending By Me
      .addCase(fetchPendingInvitationsByMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingInvitationsByMe.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingByMe = action.payload;
      })
      .addCase(fetchPendingInvitationsByMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pending By Team
      .addCase(fetchPendingInvitationsByTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingInvitationsByTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingByTeam = action.payload;
      })
      .addCase(fetchPendingInvitationsByTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Inactive Works
      .addCase(fetchInactiveWorks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInactiveWorks.fulfilled, (state, action) => {
        state.loading = false;
        state.inactiveWorks = action.payload;
      })
      .addCase(fetchInactiveWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // By Me
      .addCase(fetchFormApprovalsCountByMe.pending, (state) => {})
      .addCase(fetchFormApprovalsCountByMe.fulfilled, (state, action) => {
        state.loadFormApprovalsCountByMe_byMe = action.payload;
      })
      .addCase(fetchFormApprovalsCountByMe.rejected, (state, action) => {
        state.error = action.payload;
      })

      // By Manager
      .addCase(fetchFormApprovalsCountByManager.pending, (state) => {})
      .addCase(fetchFormApprovalsCountByManager.fulfilled, (state, action) => {
        state.loadFormApprovalsCountByManager_byManager = action.payload;
      })
      .addCase(fetchFormApprovalsCountByManager.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default HomePageModule.reducer;
export const { filterByModule, resetFilteredData } = HomePageModule.actions;
