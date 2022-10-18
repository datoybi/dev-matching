import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./SearchInput.module.css";
import { fetchSearchData } from "../store/actions";
import { actions } from "../store/slice";
import debounce from "../debounce";

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchInputRef = useRef();
  const { suggestion, selectedIndex } = useSelector((state) => state.search);

  const onChangeHandler = debounce(() => {
    const enteredValue = `${searchInputRef.current.value}`;
    if (enteredValue) {
      dispatch(fetchSearchData(enteredValue));
    }
  }, 1000);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (suggestion[selectedIndex]) {
      alert(suggestion[selectedIndex]);
      dispatch(actions.addSelectedLanguage(suggestion[selectedIndex]));
    } else {
      alert("언어를 선택하세요.");
    }
  };

  const onKeyDownHandler = (event) => {
    if (event.key === "ArrowDown") {
      dispatch(actions.replaceSelectedIndex(1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      dispatch(actions.replaceSelectedIndex(-1));
    }
  };

  return (
    <form className={classes.SearchInput} onSubmit={onSubmitHandler}>
      <input
        className={classes.SearchInput__input}
        type="text"
        placeholder="프로그램 언어를 입력하세요."
        ref={searchInputRef}
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        autoFocus
      />
    </form>
  );
};

export default SearchInput;
