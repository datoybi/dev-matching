const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/";

export const request = async (url) => {
  try {
    const fullURL = `${API_END_POINT}${url}`;
    const response = await fetch(fullURL);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error("서버의 상태가 이상합니다!");
  } catch (e) {
    console.log(`무언가 잘못되었습니다! ${e.message}`);
  }
};
