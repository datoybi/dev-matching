import { createContext } from "react";

const NodesContext = createContext({
  selectedNodeId: "",
  nodes: [],
  breadcrumbs: [{ id: "", name: "root" }],
  isRoot: true,
  onChangeNodesHandler: (data) => {},
});

export default NodesContext;
