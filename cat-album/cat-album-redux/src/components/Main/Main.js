import { useSelector } from "react-redux";

import Breadcrumbs from "./Breadcrumbs";
import classes from "./Main.module.css";
import Nodes from "./Nodes";
import Loading from "../Modal/Loading";

const Main = () => {
  const isLoading = useSelector((state) => state.nodes.isLoading);
  console.log(isLoading);

  return (
    <div className={classes.app}>
      {isLoading && <Loading />}
      {!isLoading && <Breadcrumbs />}
      {!isLoading && <Nodes />}
    </div>
  );
};

export default Main;
