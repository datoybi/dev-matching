// import { END_POINT } from './utils/constant.js';
const API_END_POINT = "";
const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data,
      }),
    };
  },
  PUT() {
    return {
      method: "PUT",
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

const request = async (url, option) => {
  try {
    // const response = await fetch(`${END_POINT}${url}?delay=500`, option);
    const fullURL = `${API_END_POINT}${url}`;

    const response = await fetch(fullURL, option);
    console.log(fullURL);

    if (response.ok) {
      const json = await response.json();
      return json;
    }

    throw new Error("fetch error");
  } catch (e) {
    console.log("request error " + e);
  }
};

// export const fetchData = (username) => {
//   try {
//     return request(`/${username}`);
//   } catch (e) {
//     console.log('fetchData error : ' + e);
//   }
// };

// export const addData = async (newText, username) => {
//   try {
//     return request(`/${username}`, HTTP_METHOD.POST(newText));
//   } catch (e) {
//     console.log('addData error : ' + e);
//   }
// };

// export const deleteData = async (id, username) => {
//   try {
//     return request(`/${username}/${id}`, HTTP_METHOD.DELETE(id));
//   } catch (e) {
//     console.log('deleteData error : ' + e);
//   }
// };

// export const toggleData = async (id, username) => {
//   try {
//     return request(`/${username}/${id}/toggle`, HTTP_METHOD.PUT(id));
//   } catch (e) {
//     console.log('toggleData error : ' + e);
//   }
// };

// export const deleteAllData = async () => {
//   try {
//     return request(`/${USERNAME}/all`, HTTP_METHOD.DELETE());
//   } catch (e) {
//     console.log('deleteAllData error : ' + e);
//   }
// };

export const fetchList = (url) => {
  try {
    return request(url);
  } catch (e) {
    console.log("fetchList error : " + e);
  }
};
