const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/";

export const fetchNodes = async (url) => {
  const response = await fetch(`${API_END_POINT}languages?keyword=${url}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch nodes");
  }
  return data;
};
