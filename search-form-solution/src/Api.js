export const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";
const cache = {};

const request = async (url) => {
  if (cache[url]) {
    return cache[url];
  }

  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();
    cache[url] = json;
    return json;
  }

  throw new Error("요청에 실패함");
};

export const fetchLanguages = async (keyword) =>
  request(`${API_END_POINT}/languages?keyword=${keyword}`);
