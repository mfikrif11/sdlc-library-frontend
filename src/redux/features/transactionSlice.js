import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const cartSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addItemTransaction: (state, action) => {
      let newItem = action.payload;
      state.data.push(newItem);
    },
  },
});

export const { addItemTransaction } = cartSlice.actions;
export default cartSlice.reducer;
