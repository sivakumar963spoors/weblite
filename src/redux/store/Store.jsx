import { configureStore } from '@reduxjs/toolkit';
import ActionRequiredReducer from '../slices/ActionRequiredSlice';

const Store = configureStore({
  reducer: {
    ActionRequired: ActionRequiredReducer, 
  },
});

export default Store;
