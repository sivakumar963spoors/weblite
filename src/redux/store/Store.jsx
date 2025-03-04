import { configureStore } from '@reduxjs/toolkit';
import ActionRequiredReducer from '../slices/ActionRequiredSlice';
import CustomerModuleReducer from '../slices/CustomerModule';
import DayPlannerReducer from '../slices/DayPalneModule';
import HomePageModuleReducer from '../slices/HomePageSlice';
import LeavesModuleReducer from '../slices/LeavesModule';
import menuReducer from '../slices/MenuSlice';
const Store = configureStore({
  reducer: {
    ActionRequired: ActionRequiredReducer, 
    CustomerModule:CustomerModuleReducer,
    LeavesModule:LeavesModuleReducer,
    menu: menuReducer,
    DayPlannerModule: DayPlannerReducer,
    HomePageModule: HomePageModuleReducer
  },
});

export default Store;
