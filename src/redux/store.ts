import { combineReducers, configureStore } from "@reduxjs/toolkit";
import promptReducer from "./slice/SavedCode";
import userReducer from "./slice/UserProfile";
const rootReducer = combineReducers({
  prompt: promptReducer,
  user: userReducer
});


const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

