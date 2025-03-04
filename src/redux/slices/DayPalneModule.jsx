import { createSlice } from '@reduxjs/toolkit'
import { DayPlannerModuleMenu } from '../../components/dayplanner/DayPlannerData'
const initialState ={
    DayPlanModuleMenu:DayPlannerModuleMenu}
   
const DayPlanModule = createSlice({
    name:'DayPlanModule', 
    initialState,
    reducers:{

    }
})
export default DayPlanModule.reducer