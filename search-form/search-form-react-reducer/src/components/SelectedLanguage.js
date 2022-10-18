import classes from "./SelectedLanguage.module.css";
import { useContext } from "react";
import SearchContext from "../store/search-context";

const SelectedLanguage = () => {
  const { selectedLanguage } = useContext(SearchContext);

  return (
    <div className={classes.SelectedLanguage}>
      <ul>
        {selectedLanguage.map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedLanguage;
