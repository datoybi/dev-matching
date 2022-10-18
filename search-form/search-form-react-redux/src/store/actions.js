import { actions } from "./slice";

const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/";

export const fetchSearchData = (keyword) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_END_POINT}languages?keyword=${keyword}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const suggestion = await fetchData(keyword);
      dispatch(
        actions.replaceSuggestion({
          suggestion: suggestion || [],
          keyword,
        })
      );
    } catch (error) {
      console.log(error || "Something went wrong");
    }
  };
};
