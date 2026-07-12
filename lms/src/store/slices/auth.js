import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  access: null,
  refresh: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.user = action.payload.user;
    },

    setLogout: (state) => {
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;