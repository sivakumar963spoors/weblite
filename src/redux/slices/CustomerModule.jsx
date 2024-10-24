import { createSlice } from '@reduxjs/toolkit'
import { CustomerData, CustomerModuleMenu } from '../../components/customers/CustomerData'
const initialState ={
    CustomerModuleMenu:CustomerModuleMenu,
    customerData:CustomerData
}
const CustomerModule = createSlice({
    name:'CustomerModule', 
    initialState,
    reducers:{

    }
})
export default CustomerModule.reducer