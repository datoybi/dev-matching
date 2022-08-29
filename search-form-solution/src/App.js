import { fetchLanguages } from "./Api.js";
import SelectdLanguages from "./components/SelectdLanguages.js";
import SearchInput from "./components/SerachInput.js";
import Suggestion from "./components/Suggestion.js";

export default function App({ $target }) {
  this.state = {
    fetchLanguages: [],
    selectedLanguages: [],
  };

  const selectedLanguages = new SelectdLanguages({ $target, initialState: [] });

  const searchInput = new SearchInput({
    $target,
    initialState: "",
    onChange: async (keyword) => {
      if (keyword.length === 0) {
        this.setState({
          fetchLanguages: [],
        });
      } else {
        const languages = await fetchLanguages(keyword);
        this.setState({
          fetchLanguages: languages,
        });
      }
    },
  });

  const suggestion = new Suggestion({
    $target,
    initialState: { cursor: 0, items: [] },
    onSelect: (language) => {
      alert(language);

      const nextSelectedLanguages = [...this.state.selectedLanguages];
      const index = nextSelectedLanguages.findIndex(
        (selectedLanguage) => selectedLanguage === language
      );

      if (index > -1) {
        nextSelectedLanguages.splice(index, 1);
      }
      nextSelectedLanguages.push(language);

      this.setState({
        ...this.state,
        selectedLanguages: nextSelectedLanguages,
      });
    },
  });

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    suggestion.setState({
      SelectedIndex: 0,
      items: this.state.fetchLanguages,
    });

    selectedLanguages.setState(this.state.selectedLanguages);
  };
}
