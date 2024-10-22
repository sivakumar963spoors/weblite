import { createSlice } from "@reduxjs/toolkit";
import { actionRequiredData } from "../../components/task/ActionRequiredData";
import { workSpecList } from "../../components/task/WorksepcList";
import { useSelector } from "react-redux";

const ActionRequiredSlice = createSlice({
  name: "ActionRequired",
  initialState: {
    isLoading:false,
    requiredData: actionRequiredData,
    workspecListdata :workSpecList
  },
  reducers: {
    getData:(state,action)=>{
        state.workspecListdata = action.payload; 
        state.requiredData=action.payload;
        state.isLoading=true
    }

  },
});
export const{getData}=ActionRequiredSlice.actions
export default ActionRequiredSlice.reducer;
