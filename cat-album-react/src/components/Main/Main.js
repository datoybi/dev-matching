import { useContext } from "react";
import { NodesContext } from "../../store/NodesProvider";
import Breadcrumbs from "./Breadcrumbs";
import classes from "./Main.module.css";
import Nodes from "./Nodes";
import Loading from "../Modal/Loading";

const Main = (props) => {
  const nodesCtx = useContext(NodesContext);
  const { isLoading } = nodesCtx;
  return (
    <div className={classes.app}>
      {isLoading && <Loading />}
      {!isLoading && <Breadcrumbs />}
      {!isLoading && <Nodes filePath={props.filePath} />}
    </div>
  );
};

export default Main;
