import { useReducer } from "react";
import ProductContext from "./product-context";

const initialState = {
  productsList: [],
  selectedProduct: [],
  cart: [],
};

export const productReducer = (state, action) => {
  console.log(state, action);

  switch (action.type) {
    case "LIST": {
      const result = [];
      action.responseData.forEach((data) => {
        result.push({
          id: data.id,
          name: data.name,
          imageUrl: data.imageUrl,
          price: data.price,
        });
      });
      return { ...state, productsList: result };
    }
    case "DETAIL": {
      return { ...state, selectedProduct: action.responseData };
    }

    default:
      return initialState;
  }
};

const ProductProvider = (props) => {
  const [productState, productDispatcher] = useReducer(
    productReducer,
    initialState
  );

  const onChange = ({ type, responseData }) => {
    productDispatcher({ type, responseData });
  };

  const contextValue = {
    productsList: productState.productsList,
    selectedProduct: productState.selectedProduct,
    cart: productState.cart,
    onChange: onChange,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
