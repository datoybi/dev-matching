const API_END_POINT = "http://localhost:3000/";

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
