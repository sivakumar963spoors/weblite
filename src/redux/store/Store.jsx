import { configureStore } from '@reduxjs/toolkit';
import ActionRequiredReducer from '../slices/ActionRequiredSlice';
import CustomerModuleReducer from '../slices/CustomerModule';
import DayPlannerReducer from '../slices/DayPalneModule';
import HomePageModuleReducer from '../slices/HomePageSlice';
import LeavesModuleReducer from '../slices/LeavesModule';
import menuReducer from '../slices/MenuSlice';
import ApprovalReducer from '../slices/ApprovalSlice';
import workspecReducer from '../slices/WorkSpecSlice'

const Store = configureStore({
  reducer: {
    ActionRequired: ActionRequiredReducer, 
    CustomerModule:CustomerModuleReducer,
    LeavesModule:LeavesModuleReducer,
    menu: menuReducer,
    DayPlannerModule: DayPlannerReducer,
    HomePageModule: HomePageModuleReducer,
    ApprovalModule:ApprovalReducer,
    WorkSepcModule:workspecReducer
  },
});

export default Store;
