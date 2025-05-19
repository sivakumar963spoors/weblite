import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadHomeScreenCards_ajax, loggedInUser_ajax } from "../../api/Auth";
import { workSpecsData } from "../../components/task/TaskData";

const initialState = {

  workSpecsDataMenu: workSpecsData,
  LoadHomeScreenCards: [],
  status: "",
  isLoadHomeScreenCards: false,
  loggedInUser: {},
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

const HomePageModule = createSlice({
  name: "HomePageModule",
  initialState,
  reducers: {
    filterByModule: (state, action) => {
      const searchText = action.payload
        ? action.payload.toLowerCase().trim()
        : "";

      if (!searchText) {
        state.filteredHomePageData = state.HomePageData;
        return;
      }

      state.filteredHomePageData = state.HomePageData.filter((item) =>
        item.moduleName && typeof item.moduleName === "string"
          ? item.moduleName.toLowerCase().includes(searchText)
          : false
      );

      if (state.filteredHomePageData.length === 0) {
      }
    },
    resetFilteredData: (state) => {
      state.filteredHomePageData = state.HomePageData;
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
      });
  },
});

export default HomePageModule.reducer;
export const { filterByModule, resetFilteredData } = HomePageModule.actions;
