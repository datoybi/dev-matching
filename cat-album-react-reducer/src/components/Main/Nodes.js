import { useContext, useEffect, useState } from "react";
import classes from "./Nodes.module.css";
import Node from "./Node.js";
import NodesContext from "../../store/nodes-context";
import { fetchNodes } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import Loading from "../Modal/Loading";
import ImageView from "../Modal/ImageView";

const Nodes = () => {
  const nodesCtx = useContext(NodesContext);
  const { nodes, isRoot, breadcrumbs } = nodesCtx;
  const { sendRequest, status, data } = useHttp(fetchNodes);
  const [selectedNode, setSelectedNode] = useState("");
  const [filePath, setFilePath] = useState(null);

  const onClickHandler = ({ id, name, type, filePath }) => {
    if (type === "FILE") {
      setFilePath(filePath);
    } else if (type === "PREV") {
      let selectedNewId = breadcrumbs[breadcrumbs.length - 2].id;
      setSelectedNode({ id: selectedNewId, type });
      selectedNewId = selectedNewId ? `/${selectedNewId}` : "";
      sendRequest(selectedNewId);
    } else if (type === "DIRECTORY") {
      const newId = id ? `/${id}` : "";
      sendRequest(newId);
      setSelectedNode({ id, name, type });
    }
  };

  useEffect(() => {
    if (
      status === "completed" &&
      nodesCtx.selectedNodeId !== selectedNode.id &&
      selectedNode !== "" &&
      selectedNode.type !== "FILE"
    ) {
      nodesCtx.onChange({ ...selectedNode, data });
      setSelectedNode("");
    }
  }, [data, status, nodesCtx, selectedNode]);

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
    setFilePath(null);
  };

  return (
    <>
      {status === "pending" ? (
        <Loading />
      ) : (
        <div className={classes.Nodes}>
          {filePath && (
            <ImageView onClose={onCloseImageHandler} filePath={filePath} />
          )}
          {prevElement}
          {nodeElements}
        </div>
      )}
    </>
  );
};

export default Nodes;
