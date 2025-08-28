import { combineReducers, configureStore } from "@reduxjs/toolkit";
import promptReducer from "./slice/SavedCode";
import userReducer from "./slice/UserProfile";
import sessionReducer from './slice/UserSession'
const rootReducer = combineReducers({
  prompt: promptReducer,
  user: userReducer,
  session: sessionReducer
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

