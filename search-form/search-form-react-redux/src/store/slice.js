import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: {
    keyword: "",
    suggestion: [],
    selectedIndex: 0,
    selectedLanguage: [],
  },
  reducers: {
    replaceSuggestion(state, action) {
      state.suggestion = action.payload.suggestion;
      state.keyword = action.payload.keyword;
    },
    onClickSelectedIndex(state, action) {
      state.selectedIndex = action.payload;
    },
    replaceSelectedIndex(state, action) {
      state.selectedIndex += action.payload;
      if (state.selectedIndex >= state.suggestion.length) {
        state.selectedIndex = 0;
      }
      if (state.selectedIndex < 0) {
        state.selectedIndex = state.suggestion.length - 1;
      }
    },
    addSelectedLanguage(state, action) {
      const newLanguage = action.payload;
      const index = state.selectedLanguage.findIndex(
        (language) => language === newLanguage
      );
      if (index >= 0) {
        state.selectedLanguage.splice(index, 1);
        state.selectedLanguage.push(action.payload);
      } else {
        state.selectedLanguage.push(action.payload);
      }
      if (state.selectedLanguage.length > 5) {
        state.selectedLanguage.shift();
      }
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;
