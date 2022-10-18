import { nodesActions } from "./nodes-slice";

const API_END_POINT =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev";

export const fetchNodesData = (url) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${API_END_POINT}${url}`);

      if (!response.ok) {
        throw new Error("Could not fetch cat album data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      dispatch(nodesActions.setIsLoading(true));
      const nodeData = await fetchData(url);
      dispatch(
        nodesActions.replaceNodes({
          nodes: nodeData || [],
        })
      );
      dispatch(nodesActions.setIsLoading(false));
    } catch (error) {
      dispatch(nodesActions.setIsLoading(false));
      console.log(error || "Something went wrong");
    }
  };
};
