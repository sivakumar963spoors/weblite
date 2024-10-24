import { configureStore } from '@reduxjs/toolkit';
import ActionRequiredReducer from '../slices/ActionRequiredSlice';
import CustomerModuleReducer from '../slices/CustomerModule'
const Store = configureStore({
  reducer: {
    ActionRequired: ActionRequiredReducer, 
    CustomerModule:CustomerModuleReducer
  },
});

export default Store;
