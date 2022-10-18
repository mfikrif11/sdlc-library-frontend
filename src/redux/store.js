import authSlice from "./features/authSlice";
import bookSlice from "./features/bookSlice";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    book: bookSlice,
    cart: cartSlice,
  },
});
