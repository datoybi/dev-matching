import Breadcrumbs from "./Breadcrumbs";
import classes from "./Main.module.css";
import Nodes from "./Nodes";

const Main = () => {
  let clickedId;

  const onClickHandler = (id) => {
    clickedId = id;
  };

  return (
    <div className={classes.app}>
      <Breadcrumbs onClick={onClickHandler} />
      <Nodes clickedId={clickedId} />
    </div>
  );
};

export default Main;
