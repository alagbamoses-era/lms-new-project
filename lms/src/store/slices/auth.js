import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  refreshToken: null,
  account: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(state, action) {
      const { token, refreshToken } = action.payload;
      console.log("Setting auth tokens:", { token, refreshToken });

      state.token = token;
      state.refreshToken = refreshToken;
    },

    setAccount(state, action) {
      state.account = action.payload;
    },

    logout: () => initialState,
  },
});

// Actions
export const { setAuthTokens, setAccount, logout } = authSlice.actions;

// Reducer
export default authSlice.reducer;