import { useDispatch, useSelector } from "react-redux";

import Breadcrumb from "./Breadcrumb";
import classes from "./Breadcrumbs.module.css";
import { fetchNodesData } from "../../store/nodes-actions";
import { nodesActions } from "../../store/nodes-slice";

const Breadcrumbs = () => {
  const dispatch = useDispatch();
  const breadcrumbs = useSelector((state) => state.nodes.breadcrumbs);

  const onClickHandler = (id, name) => {
    if (name === "root") {
      dispatch(fetchNodesData(""));
      dispatch(nodesActions.moveNodes({ id: "" }));
    } else {
      let selectedId = breadcrumbs.find(
        (breadcrumb) => breadcrumb.id === id
      ).id;
      const url = `/${selectedId}`;
      dispatch(fetchNodesData(url));
      dispatch(nodesActions.moveNodes({ id: selectedId }));
    }
  };

  return (
    <nav className={classes.Breadcrumb}>
      {breadcrumbs.map((breadcrumb) => (
        <Breadcrumb
          key={breadcrumb.id}
          id={breadcrumb.id}
          onClick={onClickHandler}
          name={breadcrumb.name}
        />
      ))}
    </nav>
  );
};

export default Breadcrumbs;
