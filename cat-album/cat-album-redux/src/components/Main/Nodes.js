import { useDispatch, useSelector } from "react-redux";

import classes from "./Nodes.module.css";
import { fetchNodesData } from "../../store/nodes-actions";
import { nodesActions } from "../../store/nodes-slice";
import Node from "./Node.js";
import ImageView from "../Modal/ImageView";

const Nodes = () => {
  const dispatch = useDispatch();
  const { nodes, isRoot, breadcrumbs, filePath } = useSelector(
    (state) => state.nodes
  );

  const onClickHandler = ({ id, name, type, filePath }) => {
    if (type === "FILE") {
      dispatch(nodesActions.setFilePath(filePath));
    } else if (type === "PREV") {
      let selectedNewId = breadcrumbs[breadcrumbs.length - 2].id;
      let url = selectedNewId ? `/${selectedNewId}` : "";
      dispatch(fetchNodesData(url));
      dispatch(nodesActions.prevNodes({ id: selectedNewId }));
    } else if (type === "DIRECTORY") {
      const newId = id ? `/${id}` : "";
      dispatch(fetchNodesData(newId));
      dispatch(nodesActions.directoryNodes({ id, name }));
    }
  };

  const prevElement = !isRoot && (
    <Node
      key="PREV"
      id=""
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

  const onCloseImageHandler = () => {
    dispatch(nodesActions.setFilePath(""));
  };

  return (
    <div className={classes.Nodes}>
      {filePath && (
        <ImageView onClose={onCloseImageHandler} filePath={filePath} />
      )}
      {prevElement}
      {nodeElements}
    </div>
  );
};

export default Nodes;
