import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {LeavesModuleMenu} from '../../components/leavesModule/Leaved_data'
const initialState ={
    LeavesModuleMenu:LeavesModuleMenu,
    status: "idle", 
    error: null,
    data:{}

}

export const getLeavesData = createAsyncThunk(
    "leaves/fetchLeavesData",
    async () => {
      const url = "http://localhost:8000/view/leaves/new";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch leaves data");
      }
      return await response.json();
    }
  );
const LeavesModule = createSlice({
    name:'LaeveModule', 
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
          .addCase(getLeavesData.pending, (state) => {
            state.status = "loading";
          })
          .addCase(getLeavesData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            console.log(action.payload)
          })
          .addCase(getLeavesData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
      },
})
export default LeavesModule.reducer