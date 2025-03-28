import { createSlice } from '@reduxjs/toolkit';
import { DayPlannerModuleMenu } from '../../components/dayplanner/DayPlannerData';
const initialState ={
    DayPlanModuleMenu:DayPlannerModuleMenu,
    menuItem :''
}
   
const DayPlanModule = createSlice({
    name:'DayPlanModule', 
    initialState,
    reducers:{
        toggleMenuTitleDayPlan: (state, action) => {
            state.menuItem = action.payload;
            
          },

    }
})
export default DayPlanModule.reducer
export const {toggleMenuTitleDayPlan}=DayPlanModule.actions