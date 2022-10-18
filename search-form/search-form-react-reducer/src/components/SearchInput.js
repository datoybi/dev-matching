import { useRef, useContext } from "react";

import classes from "./SearchInput.module.css";
import debounce from "../debounce";
import { fetchNodes } from "../lib/api";
import useHttp from "../hooks/use-http";
import SearchContext from "../store/search-context";

const SearchInput = () => {
  const searchInputRef = useRef();
  const { sendRequest } = useHttp(fetchNodes);
  const { suggestion, selectedIndex, onKeyDown, onSubmit } =
    useContext(SearchContext);

  const onChangeHandler = debounce(() => {
    const enteredValue = `${searchInputRef.current.value}`;
    if (enteredValue) {
      sendRequest(enteredValue);
    }
  }, 1000);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (suggestion[selectedIndex]) {
      alert(suggestion[selectedIndex]);
      onSubmit({
        type: "SUBMIT",
        selectedIndex: selectedIndex,
        selectedLanguage: suggestion[selectedIndex],
      });
    } else {
      alert("언어를 선택하세요.");
    }
  };

  const onKeyDownHandler = (event) => {
    if (event.key === "ArrowDown") {
      onKeyDown({
        type: "KEYPRESS",
        addIndexValue: 1,
      });
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      onKeyDown({
        type: "KEYPRESS",
        addIndexValue: -1,
      });
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
