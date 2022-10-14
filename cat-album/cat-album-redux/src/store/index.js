import { configureStore } from "@reduxjs/toolkit";
import nodesSlice from "./nodes-slice";

const store = configureStore({ reducer: { nodes: nodesSlice } });

export default store;
