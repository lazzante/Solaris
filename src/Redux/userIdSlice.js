import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userIdSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    changeUserId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeUserId } = userIdSlice.actions;
export default userIdSlice.reducer;
