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

    // Login / Register successful authentication
    setLogin: (state, action) => {
      const { access, refresh, user } = action.payload || {};

      state.access = access || null;
      state.refresh = refresh || null;
      state.user = user || null;

      state.isAuthenticated = Boolean(access);
    },


    // Update only tokens (used for refresh token flow)
    setTokens: (state, action) => {
      const { access, refresh } = action.payload || {};

      state.access = access || state.access;
      state.refresh = refresh || state.refresh;

      state.isAuthenticated = Boolean(state.access);
    },


    // Update user information
    setUser: (state, action) => {
      state.user = action.payload || null;
    },


    // Logout user
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = null;
    },

  },
});


export const {
  setLogin,
  setLogout,
  setTokens,
  setUser,
} = authSlice.actions;


export default authSlice.reducer;