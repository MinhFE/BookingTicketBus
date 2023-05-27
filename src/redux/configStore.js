import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import UserReducer from "./reducers/userReducer";
import AddressReducer from "./reducers/addressReducer";
import CareerReducer from "./reducers/careerReducer";
import ScheduleReducer from "./reducers/scheduleReducer";
import { combineReducers } from "redux";
import ManageCarReducer from "./reducers/admin/manageCarReducer";
import ManageUserReducer from "./reducers/admin/manageUserReducer";
import ManageTicketReducer from "./reducers/admin/manageTicketReducer";
import ManageAddressReducer from "./reducers/admin/manageAddressReducer";
import ManageCareerReducer from "./reducers/admin/manageCareerReducer";
import ManageBusInfoReducer from "./reducers/admin/manageBusInfoReducer";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  UserReducer,
  AddressReducer,
  CareerReducer,
  ScheduleReducer,
  //Role Admin
  ManageCarReducer,
  ManageUserReducer,
  ManageTicketReducer,
  ManageAddressReducer,
  ManageCareerReducer,
  ManageBusInfoReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
let persistor = persistStore(store);
export { store, persistor };
