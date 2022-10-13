import LoadingGif from "../../assets/nyan-cat.gif";
import classes from "./ImageView.module.css";

const Loading = () => {
  return (
    <div className={`${classes.Modal} Loading`}>
      <div className="content">
        <img src={LoadingGif} alt="onLoading..." />
      </div>
    </div>
  );
};

export default Loading;
