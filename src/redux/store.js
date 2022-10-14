import { configureStore } from "@reduxjs/toolkit"
<<<<<<< Updated upstream
import bookSlice from "./features/bookSlice"

export const store = configureStore({ reducer: { book: bookSlice } })
=======
import authSlice from "./features/authSlice"
import bookSlice from "./features/bookSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        book: bookSlice,
    },
})
>>>>>>> Stashed changes
