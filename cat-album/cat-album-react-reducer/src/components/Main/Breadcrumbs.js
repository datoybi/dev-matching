import { useContext, useEffect, useState } from "react";

import NodesContext from "../../store/nodes-context";
import useHttp from "../../hooks/use-http";
import classes from "./Breadcrumbs.module.css";
import { fetchNodes } from "../../lib/api";
import Breadcrumb from "./Breadcrumb";
import Loading from "../Modal/Loading";

const Breadcrumbs = () => {
  const nodesCtx = useContext(NodesContext);
  const { sendRequest, status, data } = useHttp(fetchNodes);
  const [selectedNode, setSelectedNode] = useState("");
  let { breadcrumbs } = nodesCtx;

  const onClickHandler = (id, name) => {
    let selectedId = "";
    setSelectedNode({ type: "MOVE", id: selectedId });
    if (name !== "root") {
      selectedId = breadcrumbs.find((breadcrumb) => breadcrumb.id === id).id;
      setSelectedNode({ type: "MOVE", id: selectedId });
      selectedId = selectedId ? `/${selectedId}` : "";
    }
    sendRequest(selectedId);
  };

  useEffect(() => {
    if (
      status === "completed" &&
      nodesCtx.selectedNodeId !== selectedNode.id &&
      selectedNode !== ""
    ) {
      nodesCtx.onChange({ ...selectedNode, data });
      setSelectedNode("");
    }
  }, [data, status, nodesCtx, selectedNode]);

  return (
    <nav className={classes.Breadcrumb}>
      {status === "pending" ? (
        <Loading />
      ) : (
        breadcrumbs.map((breadcrumb) => (
          <Breadcrumb
            key={breadcrumb.id}
            id={breadcrumb.id}
            onClick={onClickHandler}
            name={breadcrumb.name}
          />
        ))
      )}
    </nav>
  );
};

export default Breadcrumbs;
