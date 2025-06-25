import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage

// Import all reducers
import ActionRequiredReducer from "../slices/ActionRequiredSlice";
import ApprovalReducer from "../slices/ApprovalSlice";
import CustomerModuleReducer from "../slices/CustomerModule";
import DayPlannerReducer from "../slices/DayPalneModule";
import HomePageModuleReducer from "../slices/HomePageSlice";
import KnowledgeBaseReducer from "../slices/KnowledgeBaseModule";
import LeavesModuleReducer from "../slices/LeavesModule";
import menuReducer from "../slices/MenuSlice";
import MobileReportReducer from "../slices/MobileReportSlice";
import loginReducer from "../slices/UserLoginSlice";

import WorkSpecModuleReducer from "../slices/WorkSpec";

import FormsModuleReducer from "../slices/FormsSlice";
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

  MobileReportsModule: MobileReportReducer,
  KnowledgeBaseReducerModule: KnowledgeBaseReducer,
  FormsModule: FormsModuleReducer,
  WorkSpecModuleData: WorkSpecModuleReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage, // localStorage
  // whitelist is omitted to persist everything
  whitelist: ["login", "CustomerModule"],
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
