import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const userDetailSlice = createSlice({
  name: "detailSetter",
  initialState,
  reducers: {
    detailSetter: (state, action) => {
      console.log("STATE GELDİ : ", action.payload);
      state.value = action.payload;
      console.log("STATE = ", state.value);
    },
  },
});

export const { detailSetter } = userDetailSlice.actions;
export default userDetailSlice.reducer;
