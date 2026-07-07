// services/authService.js

import axios from "./axiosService";

export const login = (credentials) =>
  axios.post("/auth/login/", credentials);