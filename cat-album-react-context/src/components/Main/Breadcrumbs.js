import { useContext } from "react";
import { NodesContext } from "../../store/NodesProvider";
import classes from "./Breadcrumbs.module.css";
import Breadcrumb from "./Breadcrumb";

const Breadcrumbs = () => {
  const nodesCtx = useContext(NodesContext);
  let { breadcrumbs } = nodesCtx;

  const onClickHadler = (id, name) => {
    let selectedIdx = 0;
    if (name !== "root") {
      selectedIdx = breadcrumbs.findIndex((breadcrumb) => breadcrumb.id);
    }
    breadcrumbs = breadcrumbs.slice(0, selectedIdx + 1);
    nodesCtx.onClickHandler(id, breadcrumbs);
  };

  return (
    <nav className={classes.Breadcrumb}>
      {breadcrumbs.map((breadcrumb) => (
        <Breadcrumb
          key={breadcrumb.id}
          id={breadcrumb.id}
          onClick={onClickHadler}
          name={breadcrumb.name}
        />
      ))}
    </nav>
  );
};

export default Breadcrumbs;
