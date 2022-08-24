import App from "./components/App.js";
import { request } from "./api.js";
import { setLoading } from "./utils.js";

const albums = await request("/");
new App({
  $target: document.querySelector(".App"),
  initialState: {
    path: [{ id: null, name: "root" }],
    nextAlbums: albums,
    totalAlbums: [{ root: albums }],
  },
});
