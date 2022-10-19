const API_END_POINT = "http://localhost:3001/";

export const fetchData = async (url) => {
  const response = await fetch(`${API_END_POINT}${url}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch nodes");
  }
  return data;
};
