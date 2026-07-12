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


// Attach access token
axiosService.interceptors.request.use(
  (config) => {

    const { access } = store.getState().auth;

    console.log("Request:", config.url);
    console.log("Access token:", access);


    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;

  },
  (error) => Promise.reject(error)
);



// Refresh token logic
const refreshAuthLogic = async (failedRequest) => {

  const { refresh } = store.getState().auth;


  if (!refresh) {

    store.dispatch(
      authSlice.actions.logout()
    );

    return Promise.reject(
      new Error("No refresh token available")
    );
  }


  try {

    const response = await axios.post(
      `${API_URL}/auth/refresh/`,
      {
        refresh,
      }
    );


    const { access } = response.data;


    store.dispatch(
      authSlice.actions.setLogin({
        access,
        refresh,
        user: store.getState().auth.user,
      })
    );


    failedRequest.response.config.headers.Authorization =
      `Bearer ${access}`;


    return Promise.resolve();


  } catch(error) {

    console.error(
      "Refresh failed:",
      error.response?.data || error.message
    );


    store.dispatch(
      authSlice.actions.logout()
    );


    return Promise.reject(error);
  }
};



// Automatically refresh expired tokens
createAuthRefreshInterceptor(
  axiosService,
  refreshAuthLogic
);



// GET helper
export const fetcher = async (url) => {

  const response = await axiosService.get(url);

  return response.data;
};


export default axiosService;