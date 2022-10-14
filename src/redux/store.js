
import authSlice from "./features/authSlice"
import bookSlice from "./features/bookSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        book: bookSlice,
    },
})

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

