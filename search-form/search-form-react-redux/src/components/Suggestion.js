import classes from "./Suggestion.module.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/slice";

const Suggestion = ({ index, currentSuggestion }) => {
  const { keyword, selectedIndex, suggestion } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

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
    dispatch(actions.onClickSelectedIndex(index));
    dispatch(actions.addSelectedLanguage(suggestion[index]));
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
