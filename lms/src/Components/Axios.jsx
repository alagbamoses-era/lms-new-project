import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import store from "../store";
import {
  setTokens,
  setLogout,
} from "../store/slices/auth";


const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://lms-new-project-902l.onrender.com/api";



const axiosService = axios.create({
  baseURL: API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});



// Attach access token automatically
axiosService.interceptors.request.use(
  (config) => {

    const {
      access,
    } = store.getState().auth;


    if (access) {

      config.headers.Authorization =
        `Bearer ${access}`;

    }


    return config;

  },

  (error) =>
    Promise.reject(error)
);





// Refresh expired access token
const refreshAuthLogic = async (
  failedRequest
) => {

  const {
    refresh,
  } = store.getState().auth;



  if (!refresh) {

    store.dispatch(setLogout());

    return Promise.reject(
      new Error(
        "No refresh token available"
      )
    );
  }



  try {

    const response =
      await axios.post(
        `${API_URL}/auth/refresh/`,
        {
          refresh,
        }
      );



    const {
      access,
    } = response.data;



    store.dispatch(
      setTokens({
        access,
        refresh,
      })
    );



    if (
      failedRequest.response?.config
    ) {

      failedRequest.response.config.headers.Authorization =
        `Bearer ${access}`;

    }



    return Promise.resolve();


  } catch (error) {


    console.error(
      "Token refresh failed",
      error.response?.data || error.message
    );


    store.dispatch(setLogout());


    return Promise.reject(error);

  }

};





// Automatically retry failed requests after refresh
createAuthRefreshInterceptor(
  axiosService,
  refreshAuthLogic,
  {
    statusCodes: [401],
  }
);





// Simple GET helper
export const fetcher = async (
  url
) => {

  const response =
    await axiosService.get(url);


  return response.data;

};



export default axiosService;