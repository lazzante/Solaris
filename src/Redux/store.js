import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userIdReducer from "./userIdSlice";
import detailSetterReducer from "./userDetailSlice";
import { persistReducer,persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

const persistConfig = {
  key:"root",
  storage
}

const combinedReducer = combineReducers({
  userId:userIdReducer,
  detailSetter: detailSetterReducer,
})

const persistedReducer = persistReducer(persistConfig,combinedReducer);

export const store = configureStore({
  reducer:persistedReducer,
  middleware: [thunk]
});



export default persistReducer(persistConfig, combinedReducer);
export const persistor = persistStore(store)

