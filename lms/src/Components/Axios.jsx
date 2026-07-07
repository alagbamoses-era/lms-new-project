import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import store from "../store";
import authSlice from "../store/slices/auth";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const axiosService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT access token to requests
axiosService.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;

    console.log("Request URL:", config.url);
    console.log("Auth state:", store.getState().auth);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Refresh expired access token
const refreshAuthLogic = async (failedRequest) => {
  const { refreshToken } = store.getState().auth;

  console.log("Refreshing token...");
  console.log("Refresh token:", refreshToken);

  if (!refreshToken) {
    console.error("No refresh token available.");

    store.dispatch(authSlice.actions.logout());

    return Promise.reject(
      new Error("No refresh token available.")
    );
  }

  try {
    const response = await axios.post(
      `${API_URL}/auth/refresh/`,
      {
        refresh: refreshToken,
      }
    );

    const { access } = response.data;

    console.log("New access token received.");

    store.dispatch(
      authSlice.actions.setAuthTokens({
        token: access,
        refreshToken: refreshToken,
      })
    );

    failedRequest.response.config.headers.Authorization =
      `Bearer ${access}`;

    return Promise.resolve();

  } catch (error) {
    console.error(
      "Token refresh failed:",
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      store.dispatch(authSlice.actions.logout());
    }

    return Promise.reject(error);
  }
};


// Automatically refresh expired tokens
createAuthRefreshInterceptor(
  axiosService,
  refreshAuthLogic
);


// Helper GET function
export const fetcher = async (url) => {
  const response = await axiosService.get(url);
  return response.data;
};


export default axiosService;