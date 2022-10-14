import { createSlice } from "@reduxjs/toolkit";

const nodesSlice = createSlice({
  name: "nodes",
  initialState: {
    nodes: [],
    breadcrumbs: [{ id: "", name: "root" }],
    isRoot: true,
    filePath: "",
    isLoading: false,
  },
  reducers: {
    replaceNodes(state, action) {
      state.nodes = action.payload.nodes;
    },
    directoryNodes(state, action) {
      const { id, name } = action.payload;
      state.breadcrumbs = [...state.breadcrumbs, { id, name }];
      state.isRoot = state.breadcrumbs.length === 1 ? true : false;
    },
    prevNodes(state) {
      state.breadcrumbs.pop();
      state.isRoot = state.breadcrumbs.length === 1 ? true : false;
    },
    moveNodes(state, action) {
      const { id } = action.payload;
      const newIndex = state.breadcrumbs.findIndex(
        (breadcrumb) => breadcrumb.id === id
      );
      state.breadcrumbs = state.breadcrumbs.slice(0, newIndex + 1);
      state.isRoot = state.breadcrumbs.length === 1 ? true : false;
    },
    setFilePath(state, action) {
      state.filePath = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const nodesActions = nodesSlice.actions;
export default nodesSlice.reducer;
