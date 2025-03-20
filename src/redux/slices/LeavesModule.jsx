import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LeavesModuleMenu } from '../../components/leavesModule/Leaved_data';
const initialState ={
    LeavesModuleMenu:LeavesModuleMenu,
    status: "idle", 
    error: null,
    data:{}

}



export const getLeavesData = createAsyncThunk(
  "leaves/fetchLeavesData",
  async (_viewType, { rejectWithValue }) => {
 
    let url = "http://localhost:8000/view/leaves/new/manager"; 
    const viewType = Number(_viewType); 
    if (viewType === 4) {
      url = "http://localhost:8000/approve/api"; // URL for viewType 3
    }
    else if (viewType === 2){
      url ="http://localhost:8000/view/leaves/new/manager"
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch leaves data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error fetching leaves data:", error);
      return rejectWithValue(error.message); 
    }
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
            console.log(action.error.message)
          });
      },
})
export default LeavesModule.reducer