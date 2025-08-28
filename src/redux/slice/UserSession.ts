import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Session } from "@supabase/supabase-js";

interface SessionState {
  session: Session | null;
}

const initialState: SessionState = {
  session: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    clearSession: (state) => {
      state.session = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;