import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSignInReason,
  loadActionableWorksByMeURl,
  loadCompletedWorks,
  loadFormApprovalsCountByManager,
  loadFormApprovalsCountByMe,
  loadForTeamNeedTodo,
  loadFromApprovedByMe,
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
  isloggedInUser: false,
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
  fetchFormApprovedsCountByMe_byMe: [],
  fetchCompletedWorksData: [],
  fetchloadForTeamNeedTodoData: {},
  isfetchFormApprovedsCountByMe_byMe: false,
  loadFormApprovalsCountByManager_byManager: [],
  isfetchFormApprovalsCountByManager: false,
  signInReason: {},
  isSignInloading: false,
  isfetchFormApprovalsCountByMe: false,
  ispendingByTeamm: false,
  ispedingByMeCount: false,
  isworkSpecCards: false,
  isloadActionableWorksByMe: false,
  isinactiveWorks: false,
  isfetchCompletedWorks: false,
  isfetchloadForTeamNeedTodoData: false,
};
// user details
export const loggedInUser_get = createAsyncThunk(
  "homepage/loggedInUser_get",
  async (params, thunkAPI) => {
    try {
      const response = await fetch(loggedInUser_ajax(params), {
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
// cards
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

export const fetchSignInReason = createAsyncThunk(
  "homepage/fetchSignInReason",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch(getSignInReason(params), {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (!data) {
        throw new Error("Invalid response data");
      }

      return data;
    } catch (error) {
      return rejectWithValue("Error fetching today's form counts");
    }
  }
);

export const fetchTodayCount = createAsyncThunk(
  "formCounts/fetchTodayCount",
  async (empId, { rejectWithValue }) => {
    try {
      const response = await fetch(todayCountUrl(empId), {
        method: "GET",
        credentials: "include",
      });
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
// completed works
export const fetchCompletedWorks = createAsyncThunk(
  "workSpecs/fetchCompletedWorks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(loadCompletedWorks, {
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
//  team call

export const fetchloadForTeamNeedTodo = createAsyncThunk(
  "workSpecs/fetchloadForTeamNeedTodo",
  async (params, { rejectWithValue }) => {
    try {
      const res = await fetch(loadForTeamNeedTodo(params), {
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
export const fetchFormApprovedsCountByMe = createAsyncThunk(
  "formApprovals/fetchFormApprovedsCountByMe",
  async (formspecId, { rejectWithValue }) => {
    try {
      const response = await fetch(loadFromApprovedByMe(formspecId), {
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
        state.isloggedInUser = true;
      })
      .addCase(loggedInUser_get.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.isloggedInUser = false;
      })
      .addCase(loggedInUser_get.rejected, (state, action) => {
        state.isloggedInUser = false;
      })
      .addCase(loadHomeScreenCards_get.pending, (state) => {
        state.isLoadHomeScreenCards = true;
      })
      .addCase(loadHomeScreenCards_get.fulfilled, (state, action) => {
        state.isLoadHomeScreenCards = false;
        state.LoadHomeScreenCards = action.payload;
      })
      .addCase(loadHomeScreenCards_get.rejected, (state, action) => {
        state.isLoadHomeScreenCards = false;
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
      .addCase(Get_loadActionableWorksByMe.pending, (state) => {
        state.isloadActionableWorksByMe = true;
      })

      .addCase(Get_loadActionableWorksByMe.fulfilled, (state, action) => {
        state.loadActionableWorksByMe = action.payload;
        state.isloadActionableWorksByMe = false;
      })

      .addCase(Get_loadActionableWorksByMe.rejected, (state, action) => {
        state.error = action.payload;
        state.isloadActionableWorksByMe = false;
      })
      .addCase(fetchWorkSpecCards.pending, (state) => {
        state.isworkSpecCards = true;
      })
      .addCase(fetchWorkSpecCards.fulfilled, (state, action) => {
        state.workSpecCards = action.payload;
        state.isworkSpecCards = false;
      })
      .addCase(fetchWorkSpecCards.rejected, (state, action) => {
        state.isworkSpecCards = false;
        state.error = action.payload;
      })

      // Pending By Me
      .addCase(fetchPendingInvitationsByMe.pending, (state) => {
        state.ispedingByMeCount = true;
      })
      .addCase(fetchPendingInvitationsByMe.fulfilled, (state, action) => {
        state.pendingByMe = action.payload;
        state.ispedingByMeCount = false;
      })
      .addCase(fetchPendingInvitationsByMe.rejected, (state, action) => {
        state.ispedingByMeCount = false;
        state.error = action.payload;
      })

      // Pending By Team
      .addCase(fetchPendingInvitationsByTeam.pending, (state) => {
        state.ispendingByTeamm = true;
      })
      .addCase(fetchPendingInvitationsByTeam.fulfilled, (state, action) => {
        state.pendingByTeam = action.payload;
        state.ispendingByTeamm = false;
      })
      .addCase(fetchPendingInvitationsByTeam.rejected, (state, action) => {
        state.ispendingByTeamm = false;
        state.error = action.payload;
      })
      //completed

      .addCase(fetchCompletedWorks.pending, (state) => {
        state.isfetchCompletedWorks = true;
      })
      .addCase(fetchCompletedWorks.fulfilled, (state, action) => {
        state.fetchCompletedWorksData = action.payload;
        state.isfetchCompletedWorks = false;
      })
      .addCase(fetchCompletedWorks.rejected, (state, action) => {
        state.isfetchCompletedWorks = false;
      })

      // Inactive Works
      .addCase(fetchInactiveWorks.pending, (state) => {
        state.isinactiveWorks = true;
      })
      .addCase(fetchInactiveWorks.fulfilled, (state, action) => {
        state.inactiveWorks = action.payload;
        state.isinactiveWorks = false;
      })
      .addCase(fetchInactiveWorks.rejected, (state, action) => {
        state.isinactiveWorks = false;
        state.error = action.payload;
      })

      // By Me
      .addCase(fetchloadForTeamNeedTodo.pending, (state) => {
        state.isfetchloadForTeamNeedTodoData = true;
      })
      .addCase(fetchloadForTeamNeedTodo.fulfilled, (state, action) => {
        state.fetchloadForTeamNeedTodoData = action.payload;
        state.isfetchloadForTeamNeedTodoData = false;
        console.log(action.payload)
      })
      .addCase(fetchloadForTeamNeedTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.isfetchloadForTeamNeedTodoData = false;
      })
      // by me
      .addCase(fetchFormApprovedsCountByMe.pending, (state) => {
        state.isfetchFormApprovedsCountByMe_byMe = true;
      })
      .addCase(fetchFormApprovedsCountByMe.fulfilled, (state, action) => {
        state.fetchFormApprovedsCountByMe_byMe = action.payload;
        state.isfetchFormApprovedsCountByMe_byMe = false;
      })
      .addCase(fetchFormApprovedsCountByMe.rejected, (state, action) => {
        state.isfetchFormApprovedsCountByMe_byMe = false;
      })

      // By Manager
      .addCase(fetchFormApprovalsCountByManager.pending, (state) => {
        state.isfetchFormApprovalsCountByManager = true;
      })
      .addCase(fetchFormApprovalsCountByManager.fulfilled, (state, action) => {
        state.loadFormApprovalsCountByManager_byManager = action.payload;
        state.isfetchFormApprovalsCountByManager = false;
      })
      .addCase(fetchFormApprovalsCountByManager.rejected, (state, action) => {
        state.error = action.payload;
        state.isfetchFormApprovalsCountByManager = false;
      })

      .addCase(fetchSignInReason.pending, (state) => {
        state.isSignInloading = true;
        state.error = null;
      })
      .addCase(fetchSignInReason.fulfilled, (state, action) => {
        state.isSignInloading = false;
        state.signInReason = action.payload;
      })
      .addCase(fetchSignInReason.rejected, (state, action) => {
        state.isSignInloading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default HomePageModule.reducer;
export const { filterByModule, resetFilteredData } = HomePageModule.actions;
