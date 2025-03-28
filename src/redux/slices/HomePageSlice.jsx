import { createSlice } from "@reduxjs/toolkit";
import { cardData, workSpecsData } from "../../components/task/TaskData";

const initialState = {
    HomePageData: [...cardData].sort((a, b) => a.displayOrder - b.displayOrder), // Sort initial data
    workSpecsDataMenu: workSpecsData,
    filteredHomePageData: [...cardData].sort((a, b) => a.displayOrder - b.displayOrder), // Sorted filtered data
  };
  
const HomePageModule = createSlice({
  name: "HomePageModule",
  initialState,
  reducers: {
    filterByModule: (state, action) => {
      const searchText = action.payload ? action.payload.toLowerCase().trim() : "";

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
});

export default HomePageModule.reducer;
export const { filterByModule, resetFilteredData } = HomePageModule.actions;
