import { request } from "../api.js";
import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";
import SelectedLanguage from "./SelectedLanguage.js";
import { debounce } from "../debounce.js";
import { getItem, setItem } from "../Storage.js";

const cache = {};

export default function App({ $app }) {
  this.state = {
    keyword: "",
    suggestion: [], // fetchedLanguages
    selectedIndex: 0,
    selectedLanguage: [],
  };

  const selectedLanguage = new SelectedLanguage({
    $app,
    onClick: async (selectedValue) => {
      let nextSuggestion = null;
      if (cache[selectedValue]) {
        nextSuggestion = cache[selectedValue];
      } else {
        nextSuggestion = await request(`languages?keyword=${selectedValue}`);
        cache[selectedValue] = nextSuggestion;
      }

      this.setState({
        ...this.state,
        keyword: selectedValue,
        suggestion: nextSuggestion,
      });
    },
  });

  const searchInput = new SearchInput({
    $app,
    onInput: debounce(async (inputValue) => {
      if (!inputValue) {
        this.setState({
          ...this.state,
          keyword: "",
          suggestion: [],
        });
        return;
      }
      console.log(inputValue);
      let nextSuggestion = null;
      if (cache[inputValue]) {
        nextSuggestion = cache[inputValue];
      } else {
        nextSuggestion = await request(`languages?keyword=${inputValue}`);
        cache[inputValue] = nextSuggestion;
      }

      setItem("searchState", {
        ...getItem("searchState"),
        keyword: inputValue,
      });

      this.setState({
        ...this.state,
        keyword: inputValue,
        suggestion: nextSuggestion,
      });
    }, 800),
    onSubmit: () => {
      const selectedValue = this.state.suggestion[this.state.selectedIndex];
      alert(selectedValue);
      const selectedLanguages = [...this.state.selectedLanguage];
      const nextIndex = selectedLanguages.indexOf(selectedValue); // 중복 체크
      let nextSelectedLanguage = null;

      if (nextIndex < 0) {
        nextSelectedLanguage = [...this.state.selectedLanguage, selectedValue];
        if (nextSelectedLanguage.length > 5) {
          nextSelectedLanguage.shift();
        }
      } else {
        selectedLanguages.splice(nextIndex, 1);
        selectedLanguages.push(selectedValue);
        nextSelectedLanguage = selectedLanguages;
      }

      setItem("searchState", {
        ...getItem("searchState"),
        selectedLanguage: nextSelectedLanguage,
      });

      this.setState({
        ...this.state,
        selectedLanguage: nextSelectedLanguage,
      });
    },
  });

  const suggestion = new Suggestion({
    $app,
    onSelectedChange: (selectedIndex) => {
      this.setState({
        ...this.state,
        selectedIndex,
      });
    },
    onClick: (selectedValue) => {
      alert(selectedValue);
      const selectedLanguages = [...this.state.selectedLanguage];
      const nextIndex = selectedLanguages.indexOf(selectedValue); // 중복 체크
      let nextSelectedLanguage = null;

      if (nextIndex < 0) {
        nextSelectedLanguage = [...this.state.selectedLanguage, selectedValue];
        if (nextSelectedLanguage.length > 5) {
          nextSelectedLanguage.shift();
        }
      } else {
        selectedLanguages.splice(nextIndex, 1);
        selectedLanguages.push(selectedValue);
        nextSelectedLanguage = selectedLanguages;
      }

      setItem("searchState", {
        ...getItem("searchState"),
        selectedLanguage: nextSelectedLanguage,
      });

      this.setState({
        ...this.state,
        selectedLanguage: nextSelectedLanguage,
      });
    },
    onSubmit: () => {
      const selectedValue = this.state.suggestion[this.state.selectedIndex];
      alert(selectedValue);
      const selectedLanguages = [...this.state.selectedLanguage];
      const nextIndex = selectedLanguages.indexOf(selectedValue); // 중복 체크
      let nextSelectedLanguage = null;

      if (nextIndex < 0) {
        nextSelectedLanguage = [...this.state.selectedLanguage, selectedValue];
        if (nextSelectedLanguage.length > 5) {
          nextSelectedLanguage.shift();
        }
      } else {
        selectedLanguages.splice(nextIndex, 1);
        selectedLanguages.push(selectedValue);
        nextSelectedLanguage = selectedLanguages;
      }

      setItem("searchState", {
        ...getItem("searchState"),
        selectedLanguage: nextSelectedLanguage,
      });

      this.setState({
        ...this.state,
        selectedLanguage: nextSelectedLanguage,
      });
    },
  });

  this.init = () => {
    this.setState({ ...this.state, ...getItem("searchState") });
  };

  this.setState = (newState) => {
    this.state = newState;
    suggestion.setState(this.state);
    searchInput.setState(this.state);
    selectedLanguage.setState(this.state.selectedLanguage);
  };

  this.init();
}
