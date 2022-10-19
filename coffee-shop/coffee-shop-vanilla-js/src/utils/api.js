const API_END_POINT = "http://localhost:3001";
// const API_END_POINT =
//   "https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (url) => {
  try {
    const fullURL = `${API_END_POINT}${url}`;
    const response = await fetch(fullURL);

    if (response.ok) {
      const json = await response.json();
      return json;
    }

    throw new Error("fetch error");
  } catch (e) {
    console.log("request error " + e);
  }
};
