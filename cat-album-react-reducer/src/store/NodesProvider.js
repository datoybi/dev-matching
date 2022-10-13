import { useReducer } from "react";
import { initialNodesState } from "../hooks/use-node";
import NodesContext from "./nodes-context";

export const nodesReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "INIT": {
      return { ...state, nodes: action.data };
    }

    case "DIRECTORY": {
      const { id, name, data } = action;
      const newBreadcrumb = [...state.breadcrumbs, { id, name }];
      const isRoot = newBreadcrumb.length === 1 ? true : false;
      return {
        ...state,
        selectedNodeId: id,
        nodes: data,
        breadcrumbs: newBreadcrumb,
        isRoot,
      };
    }

    case "PREV": {
      const { id, data } = action;
      let newBreadcrumb = [...state.breadcrumbs];
      newBreadcrumb.pop();
      const isRoot = newBreadcrumb.length === 1 ? true : false;
      return {
        ...state,
        selectedNodeId: id,
        nodes: data,
        breadcrumbs: newBreadcrumb,
        isRoot,
      };
    }

    case "MOVE": {
      const { id, data } = action;
      let newBreadcrumb = [...state.breadcrumbs];
      const newIndex = newBreadcrumb.findIndex(
        (breadcrumb) => breadcrumb.id === id
      );
      newBreadcrumb = newBreadcrumb.slice(0, newIndex + 1);
      const isRoot = newBreadcrumb.length === 1 ? true : false;
      return {
        ...state,
        selectedNodeId: id,
        nodes: data,
        breadcrumbs: newBreadcrumb,
        isRoot,
      };
    }

    default:
      return initialNodesState;
  }
};

const NodesProvider = (props) => {
  const [nodesState, nodesDispatcher] = useReducer(
    nodesReducer,
    initialNodesState
  );

  const onChangeNodesHandler = ({ id, data, name, type, filepath }) => {
    nodesDispatcher({ id, data, name, type, filepath });
  };

  const contextValue = {
    selectedNodeId: nodesState.selectedNodeId,
    nodes: nodesState.nodes,
    breadcrumbs: nodesState.breadcrumbs,
    isRoot: nodesState.isRoot,
    onChange: onChangeNodesHandler,
  };

  console.log(contextValue);

  return (
    <NodesContext.Provider value={contextValue}>
      {props.children}
    </NodesContext.Provider>
  );
};

export default NodesProvider;
