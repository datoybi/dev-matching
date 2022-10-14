import ReactDOM from "react-dom";
import React from "react";

import sampleImage from "../../assets/20201218_002047.jpg";
import classes from "./ImageView.module.css";

const END_URL =
  '"https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

const ImageModal = (props) => {
  const onClickHandler = (event) => {
    if (event.target.tagName !== "IMG") {
      props.onClose();
    }
  };

  return (
    <div className={`${classes.Modal} ImageViewer`} onClick={onClickHandler}>
      <div className="content">
        {/* <img src={`${END_URL}${props.filePath}`} alt="sample" /> */}
        <img src={sampleImage} alt="sample" />
      </div>
    </div>
  );
};

const ImageView = (props) => {
  const imgURL = `${END_URL}${props.filePath}`;
  console.log(imgURL);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ImageModal onClose={props.onClose} imgURL={imgURL} />,
        document.getElementById("Modal")
      )}
    </React.Fragment>
  );
};

export default ImageView;
