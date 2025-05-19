import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage

// Import all reducers
import ActionRequiredReducer from "../slices/ActionRequiredSlice";
import CustomerModuleReducer from "../slices/CustomerModule";
import DayPlannerReducer from "../slices/DayPalneModule";
import HomePageModuleReducer from "../slices/HomePageSlice";
import LeavesModuleReducer from "../slices/LeavesModule";
import menuReducer from "../slices/MenuSlice";
import ApprovalReducer from "../slices/ApprovalSlice";
import workspecReducer from "../slices/WorkSpecSlice";
import MobileReportReducer from "../slices/MobileReportSlice";
import loginReducer from "../slices/UserLoginSlice";
import KnowledgeBaseReducer from "../slices/KnowledgeBaseModule";

// Combine all reducers
const rootReducer = combineReducers({
  login: loginReducer,
  ActionRequired: ActionRequiredReducer,
  CustomerModule: CustomerModuleReducer,
  LeavesModule: LeavesModuleReducer,
  menu: menuReducer,
  DayPlannerModule: DayPlannerReducer,
  HomePageModule: HomePageModuleReducer,
  ApprovalModule: ApprovalReducer,
  WorkSepcModule: workspecReducer,
  MobileReportsModule: MobileReportReducer,
  KnowledgeBaseReducerModule: KnowledgeBaseReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage, // localStorage
  // whitelist is omitted to persist everything
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create and export the store
const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Important for redux-persist
    }),
});

export const persistor = persistStore(Store);
export default Store;
