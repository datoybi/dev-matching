import classes from "./Node.module.css";
import fileImage from "../../assets/file.png";
import directoryImage from "../../assets/directory.png";
import prevImage from "../../assets/prev.png";

const Node = (props) => {
  const onClickHandler = () => {
    props.onClick(props.id, props.name, props.type, props.filePath);
  };

  const imgElement = () => {
    let image;

    if (props.type === "DIRECTORY") {
      image = directoryImage;
    } else if (props.type === "FILE") {
      image = fileImage;
    } else if (props.type === "PREV") {
      image = prevImage;
    }
    return <img src={image} alt={props.type} />;
  };

  return (
    <div className={classes.Node} onClick={onClickHandler}>
      {imgElement()}
      <div>{props.name}</div>
    </div>
  );
};

export default Node;
