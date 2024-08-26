import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    updateFilterText(state, action) {
      return action.payload;
    },
  },
});

export const { updateFilterText } = filterSlice.actions;
export default filterSlice.reducer;
