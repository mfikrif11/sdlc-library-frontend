import authSlice from "./features/authSlice"
import bookSlice from "./features/bookSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        book: bookSlice,
    },
})
