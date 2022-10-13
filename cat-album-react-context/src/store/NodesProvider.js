import { createContext, useState, useEffect, useCallback } from "react";
import { request } from "../utils/api";

export const NodesContext = createContext({
  nodes: [],
  breadcrumb: [{ id: "", name: "root" }],
  isRoot: true,
  isLoading: false,
});

const NodesProvider = (props) => {
  const [nodes, setNodes] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: "", name: "root" }]);
  const [isRoot, setIsRoot] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNodes = useCallback(async (url) => {
    setIsLoading(true);
    url = url ? `/${url}` : ""; // 없으면 root
    const nodes = await request(url);
    setNodes(nodes);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNodes("");
  }, [fetchNodes]);

  const onClickHandler = (url, newBreadcrumb) => {
    fetchNodes(url);
    setBreadcrumbs(newBreadcrumb);
    setIsRoot(newBreadcrumb.length === 1 ? true : false);
  };

  const contextValue = {
    nodes,
    breadcrumbs,
    isRoot,
    isLoading,
    onClickHandler,
  };

  return (
    <NodesContext.Provider value={contextValue}>
      {props.children}
    </NodesContext.Provider>
  );
};

export default NodesProvider;
