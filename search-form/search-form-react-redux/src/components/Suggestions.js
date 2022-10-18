import classes from "./Suggestions.module.css";
import { useSelector } from "react-redux";
import Suggestion from "./Suggestion";

const Suggestions = () => {
  const { suggestion } = useSelector((state) => state.search);

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
