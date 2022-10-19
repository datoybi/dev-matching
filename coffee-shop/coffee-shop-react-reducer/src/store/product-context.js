import { createContext } from "react";

const ProductContext = createContext({
  productsList: [],
  selectedProduct: [],
  cart: [],
  onChange: (data) => {},
});

export default ProductContext;
