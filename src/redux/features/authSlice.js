import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  username: "",
  email: "",
  NIM: 0,
  is_admin: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.NIM = action.payload.NIM;
      state.is_admin = action.payload.is_admin;
    },
    logout: (state, action) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.NIM = 0;
      state.is_admin = 0;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
