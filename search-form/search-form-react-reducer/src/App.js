import "./App.css";
import SearchInput from "./components/SearchInput";
import SelectedLanguage from "./components/SelectedLanguage";
import Suggestions from "./components/Suggestions";

function App() {
  return (
    <div className="App">
      <SelectedLanguage />
      <SearchInput />
      <Suggestions />
    </div>
  );
}

export default App;
