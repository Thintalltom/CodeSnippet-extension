import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PromptProps, PromptState } from "../../types";

const initialState: PromptState = {
  selected: "",
  prompt: [],
  title: "",
  code: "",
  tags: [],
};

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
    setPrompt(state, action: PayloadAction<PromptProps[]>) {
      state.prompt = action.payload;
    },
    addPrompt(state, action: PayloadAction<PromptProps>) {
      state.prompt.push(action.payload);
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    },
    addTag(state, action: PayloadAction<string>) {
      state.tags.push(action.payload);
    },
    removeTag(state, action: PayloadAction<string>) {
      state.tags = state.tags.filter(tag => tag !== action.payload);
    },
    resetState() {
      return initialState; // resets everything
    },
  },
});

export const {
  setSelected,
  setPrompt,
  addPrompt,
  setTitle,
  setCode,
  setTags,
  addTag,
  removeTag,
  resetState,
} = promptSlice.actions;

export default promptSlice.reducer;
