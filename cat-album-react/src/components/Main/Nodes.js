import { useContext } from "react";
import { NodesContext } from "../../store/NodesProvider";
import classes from "./Nodes.module.css";
import Node from "./Node.js";

const Nodes = (props) => {
  const nodesCtx = useContext(NodesContext);
  const { nodes, isRoot } = nodesCtx;
  let { breadcrumbs } = nodesCtx;
  // console.log(nodesCtx);

  const onClickHandler = (id, name, type, filepath) => {
    let newId = id;
    if (type === "DIRECTORY") {
      breadcrumbs = [...breadcrumbs, { id: newId, name }];
      nodesCtx.onClickHandler(newId, breadcrumbs);
    } else if (type === "PREV") {
      breadcrumbs.pop();
      newId = breadcrumbs[breadcrumbs.length - 1].id;
      nodesCtx.onClickHandler(newId, breadcrumbs);
    } else if (type === "FILE") {
      props.filePath(filepath);
    }
  };

  const prevElement = !isRoot && (
    <Node
      key="PREV"
      id="PREV"
      name=""
      type="PREV"
      filePath=""
      parentn=""
      onClick={onClickHandler}
    />
  );

  const nodeElements = nodes.map((node) => (
    <Node
      key={node.id}
      id={node.id}
      name={node.name}
      type={node.type}
      filePath={node.filePath}
      parent={node.parent}
      onClick={onClickHandler}
    />
  ));

  return (
    <div className={classes.Nodes}>
      {prevElement}
      {nodeElements}
    </div>
  );
};

export default Nodes;
