import classes from "./Suggestion.module.css";
import { useContext } from "react";
import SearchContext from "../store/search-context";

const Suggestion = ({ index, currentSuggestion }) => {
  const { keyword, selectedIndex, suggestion, onSubmit } =
    useContext(SearchContext);

  const highlightMatched = (element) => {
    const regex = new RegExp(keyword, "i");
    const result = element.replace(
      regex,
      `<span class=${classes["Suggestion__item--matched"]}>${keyword}</span>`
    );
    return result;
  };

  const onClickHandler = () => {
    alert(suggestion[index]);

    onSubmit({
      type: "SUBMIT",
      selectedIndex: index,
      selectedLanguage: suggestion[index],
    });
  };

  return (
    <li
      index={index}
      className={
        selectedIndex === index
          ? `${classes["Suggestion__item--selected"]}`
          : ""
      }
      onClick={onClickHandler}
      dangerouslySetInnerHTML={{ __html: highlightMatched(currentSuggestion) }}
    ></li>
  );
};

export default Suggestion;
