import { useCallback, useContext, useReducer } from "react";
import productContext from "../store/product-context";

function httpReducer(state, action) {
  if (action.type === "LOADING") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }

  return state;
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, httpDispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });
  const productCtx = useContext(productContext);

  const sendRequest = useCallback(
    async function (url, contextType) {
      httpDispatch({ type: "LOADING" });
      try {
        const responseData = await requestFunction(url);
        httpDispatch({ type: "SUCCESS", responseData });
        console.log(responseData);
        productCtx.onChange({
          type: contextType,
          responseData,
        });
      } catch (error) {
        httpDispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction, productCtx]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
