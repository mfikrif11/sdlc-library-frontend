import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      let newItem = {
        id: action.payload.id,
        title: action.payload.title,
        author: action.payload.author,
        publish_date: action.payload.publish_date,
        genre: action.payload.genre,
        image_url: action.payload.image_url,
        description: action.payload.description,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
      };
      state.data.push(newItem);
    },
  },
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
