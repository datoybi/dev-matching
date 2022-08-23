import App from "./components/App.js";
import { request } from "./api.js";

const albums = await request("/");
new App({
  $target: document.querySelector(".App"),
  initialState: {
    path: [{ id: null, name: "root", parent: null }],
    totalAlbums: albums,
    nextAlbums: albums,
  },
});
