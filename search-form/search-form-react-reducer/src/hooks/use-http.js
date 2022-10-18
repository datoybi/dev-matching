import { useCallback, useContext } from "react";
import searchContext from "../store/search-context";

function useHttp(requestFunction) {
  const searchCtx = useContext(searchContext);

  const sendRequest = useCallback(
    async function (url) {
      try {
        const responseData = await requestFunction(url);
        searchCtx.onChange({
          type: "SEARCH",
          keyword: url,
          suggestion: responseData,
        });
      } catch (error) {
        console.log(error + "Something went wrong!");
      }
    },
    [requestFunction, searchCtx]
  );

  return {
    sendRequest,
  };
}

export default useHttp;
