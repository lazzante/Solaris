import { configureStore } from "@reduxjs/toolkit";
import userIdReducer from "./userIdSlice";

export const store = configureStore({
  reducer: {
    userId: userIdReducer,
  },
});
