// store/userSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile } from "../../types";

interface UserState {
  profile: UserProfile | null;
  userEmail: string,
}

const initialState: UserState = {
  profile: null,
  userEmail: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = null;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  },
});

export const { setUserProfile, clearUserProfile, setUserEmail } = userSlice.actions;
export default userSlice.reducer;
