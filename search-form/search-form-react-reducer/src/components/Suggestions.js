import classes from "./Suggestions.module.css";
import Suggestion from "./Suggestion";
import { useContext } from "react";
import SearchContext from "../store/search-context";

const Suggestions = () => {
  const { suggestion } = useContext(SearchContext);

  return (
    <div className={classes.Suggestion}>
      <ul>
        {suggestion.map((element, index) => (
          <Suggestion key={index} index={index} currentSuggestion={element} />
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
