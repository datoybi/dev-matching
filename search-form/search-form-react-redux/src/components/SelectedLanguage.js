import classes from "./SelectedLanguage.module.css";
import { useSelector } from "react-redux";

const SelectedLanguage = () => {
  const { selectedLanguage } = useSelector((state) => state.search);

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
