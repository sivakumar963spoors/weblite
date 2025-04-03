import { createSlice } from "@reduxjs/toolkit";
import { workmenu } from "../../components/works/WorkMenuData";

const initialState = {
 workspecMenu :workmenu
}
const Workspec = createSlice({
    name:"WorkSepcModule",
    initialState,
    reducers:{



    }

})
export default Workspec.reducer;