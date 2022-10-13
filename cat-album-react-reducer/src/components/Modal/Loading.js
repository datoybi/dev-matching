import { Fragment } from "react";
import ReactDOM from "react-dom";

import LoadingGif from "../../assets/nyan-cat.gif";
import classes from "./ImageView.module.css";

const LoadingModal = () => {
  return (
    <div className={`${classes.Modal} Loading`}>
      <div className="content">
        <img src={LoadingGif} alt="onLoading..." />
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <LoadingModal />,
        document.getElementById("Modal")
      )}
    </Fragment>
  );
};

export default Loading;
