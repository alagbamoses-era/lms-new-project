import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


import authReducer from "./slices/auth";



// Root reducers
const rootReducer = combineReducers({

  auth: authReducer,

});



// Redux Persist configuration
const persistConfig = {

  key: "root",

  version: 1,

  storage,

  whitelist: [
    "auth",
  ],

};



// Persisted reducer
const persistedReducer =
  persistReducer(
    persistConfig,
    rootReducer
  );




// Redux store
const store = configureStore({

  reducer: persistedReducer,


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({

      serializableCheck: {

        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],

      },

    }),


  devTools:
    process.env.NODE_ENV !== "production",

});



// Persistor
export const persistor =
  persistStore(store);



export default store;