import { createSlice } from '@reduxjs/toolkit';
import { cardData, workSpecsData } from '../../components/task/TaskData';
const initialState ={
    HomePageData:cardData.sort((a, b) => a.displayOrder - b.displayOrder),
    workSpecsDataMenu:workSpecsData
}
   
const HomePageModule = createSlice({
    name: "HomePageModule",
    initialState,
    reducers: {
        filterByModule: (state, action) => {
           
           // state.HomePageData= state.HomePageData.sort((a, b) => a.displayOrder - b.displayOrder);
            state.filteredHomePageData = state.HomePageData
                .filter((item) => item.moduleName.includes(action.payload)) 
               
        },
    resetFilteredData: (state) => {
        state.filteredHomePageData = state.HomePageData; 
    }
    }
})
export default HomePageModule.reducer;
export const {sortedData,filterByModule,resetFilteredData}=HomePageModule.actions