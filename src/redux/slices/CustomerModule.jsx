import { createSlice } from '@reduxjs/toolkit'
import { CustomerData, CustomerModuleMenu } from '../../components/customers/CustomerData'

const initialState = {
    CustomerModuleMenu: CustomerModuleMenu,
    customerData: CustomerData,
    filteredCustomerData: CustomerData, 
};

const CustomerModule = createSlice({
    name: 'CustomerModule',
    initialState,
    reducers: {
        filterCustomer: (state, action) => {
            const searchText = action.payload ? action.payload.toLowerCase().trim() : "";
            
            if (!searchText) {
                state.filteredCustomerData = state.customerData;
                return;
            }

            state.filteredCustomerData = state.customerData.filter((item) =>
                item.customerName && typeof item.customerName === "string"
                    ? item.customerName.toLowerCase().includes(searchText)
                    : false 
            );

            if (state.filteredCustomerData.length === 0) {
                console.warn("No matching customers found for:", searchText);
            }
        },
        resetCustomerData: (state) => {
            state.filteredCustomerData = state.customerData; 
        }
    }
});

export default CustomerModule.reducer;
export const { filterCustomer, resetCustomerData } = CustomerModule.actions;
