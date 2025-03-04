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
  async (_, { rejectWithValue }) => {
    const url =
"https://react.spoors.dev/webliteleaves/reactrest/api/view/leaves/new?leaveMenuType=2&viewType=2&teamLeaves=1&leaveViewType=2";
    try {
      // const response = await  fetch(url, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const response =await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch leaves data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data; // Return parsed JSON data

    } catch (error) {
      console.error("Error fetching leaves data:", error);
      return rejectWithValue(error.message); // Return error message for Redux state
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