import { useReducer } from "react";
import SearchContext from "./search-context";

const initialState = {
  keyword: "",
  suggestion: [],
  selectedIndex: 0,
  selectedLanguage: [],
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH": {
      const { keyword, suggestion } = action;
      return { ...state, keyword, suggestion };
    }
    case "KEYPRESS": {
      let newIndex = state.selectedIndex;
      newIndex += action.addIndexValue;

      if (newIndex >= state.suggestion.length) {
        newIndex = 0;
      }
      if (newIndex < 0) {
        newIndex = state.suggestion.length - 1;
      }
      return { ...state, selectedIndex: newIndex };
    }

    case "SUBMIT": {
      const { selectedIndex, selectedLanguage } = action;
      let newLanguage = [...state.selectedLanguage];

      const index = newLanguage.findIndex(
        (language) => language === selectedLanguage
      );
      if (index >= 0) {
        newLanguage.splice(index, 1);
        newLanguage.push(selectedLanguage);
      } else {
        newLanguage.push(selectedLanguage);
      }
      if (newLanguage.length > 5) {
        newLanguage.shift();
      }
      return { ...state, selectedLanguage: newLanguage, selectedIndex };
    }
    default:
      return initialState;
  }
};

const SearchProvider = (props) => {
  const [searchState, searchDispatcher] = useReducer(
    searchReducer,
    initialState
  );

  const onChangeHandler = ({
    type,
    keyword,
    suggestion,
    selectedIndex,
    selectedLanguage,
  }) => {
    searchDispatcher({
      type,
      keyword,
      suggestion,
      selectedIndex,
      selectedLanguage,
    });
  };

  const onKeyDownHandler = ({ type, addIndexValue }) => {
    searchDispatcher({
      type,
      addIndexValue,
    });
  };

  const onSubmitHandler = ({ type, selectedIndex, selectedLanguage }) => {
    searchDispatcher({
      type,
      selectedIndex,
      selectedLanguage,
    });
  };

  const contextValue = {
    keyword: searchState.keyword,
    suggestion: searchState.suggestion,
    selectedIndex: searchState.selectedIndex,
    selectedLanguage: searchState.selectedLanguage,
    onChange: onChangeHandler,
    onKeyDown: onKeyDownHandler,
    onSubmit: onSubmitHandler,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
