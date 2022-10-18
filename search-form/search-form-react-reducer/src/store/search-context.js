import { createContext } from "react";

const SearchContext = createContext({
  keyword: "",
  suggestion: [],
  selectedIndex: 0,
  selectedLanguage: [],
  onChange: (data) => {},
  onKeyDown: (data) => {},
  onSubmit: (data) => {},
});

export default SearchContext;
