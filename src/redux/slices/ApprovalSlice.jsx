import { createSlice } from '@reduxjs/toolkit'
import { FormData, MyApprovalData } from "../../components/myapprovals/ApprovalData";

const initialState = {
    formData: FormData, 
    myapprovalData: MyApprovalData,
  };

const ApprovalModule =createSlice({
    name :'ApprovalModule',
    initialState,
    reducers:{

    }
})
export default ApprovalModule.reducer