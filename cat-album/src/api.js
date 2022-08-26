const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/";

export const request = async (nodeId) => {
  try {
    const fullURL = `${API_END_POINT}${nodeId || ""}`;
    const response = await fetch(fullURL);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error("서버의 상태가 이상합니다.");
  } catch (e) {
    console.log("무언가 잘못되었습니다! " + e);
  }
};
