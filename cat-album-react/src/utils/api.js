const API_END_POINT =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (url) => {
  try {
    const fullURL = `${API_END_POINT}${url}`;
    const response = await fetch(fullURL);
    if (!response.ok) {
      throw new Error("서버의 상태가 이상합니다!");
    }
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};
