import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

const store = configureStore({ reducer: { search: slice } });
export default store;
