import Contents from "./Contents.js";
import Breadcrumb from "./Breadcrumb.js";
import { request } from "../api.js";

export default function App({ $target, initialState }) {
  this.state = initialState;

  this.fetchList = async (id) => {
    const response = await request(`/${id || ""}`);
    return response;
  };

  this.breadcrumb = new Breadcrumb({ $target, initialState: this.state.path });
  this.contents = new Contents({
    $target,
    initialState: this.state,
    onClick: async (id) => {
      console.log("loading id : " + id);
      // const album = this.state.totalAlbums.filter((el) => el.id === id);
      const album = this.state.totalAlbums.filter((el) => el.id === id);
      console.log(album);
      const parentId = !album.parent ? null : album.parent.id;
      const nextAlbums = await this.fetchList(id);

      this.setState({
        totalAlbums: [...this.state.totalAlbums],
        path: [
          ...this.state.path,
          { id: album.id, name: album.name, parent: parentId },
        ],
        nextAlbums,
      });
    },
  });

  this.setState = (newState) => {
    this.state = newState;
    console.log(this.state);
    this.breadcrumb.setState(this.state.path);
    this.contents.setState(this.state);
  };
}
