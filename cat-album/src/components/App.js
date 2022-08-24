import Contents from "./Contents.js";
import Breadcrumb from "./Breadcrumb.js";
import { request } from "../api.js";
import { setLoading } from "../utils.js";

export default function App({ $target, initialState }) {
  this.state = initialState;

  this.fetchList = async (id) => {
    const response = await request(`/${id || ""}`);
    return response;
  };

  this.getNodes = async (id) => {
    setLoading();
    const totalAlbumKey = !id ? "root" : id;
    const [totalAlbums] = [...this.state.totalAlbums];
    const newNodes = totalAlbums[totalAlbumKey] || (await this.fetchList(id));
    totalAlbums[totalAlbumKey] = newNodes;
    return [newNodes, [totalAlbums]];
  };

  this.breadcrumb = new Breadcrumb({
    $target,
    initialState: this.state.path,
    onClick: async (id) => {
      const [newNodes, totalAlbums] = await this.getNodes(id);
      let idx = 0;
      if (id !== "root") {
        idx = this.state.path.findIndex((el) => el.id === id);
      }
      const newPath = [...this.state.path].slice(0, idx + 1);
      this.setState({
        totalAlbums: [...totalAlbums],
        path: [...newPath],
        nextAlbums: newNodes,
      });
    },
  });
  this.contents = new Contents({
    $target,
    initialState: this.state,
    onClick: async (id, name) => {
      const [newNodes, totalAlbums] = await this.getNodes(id);
      this.setState({
        totalAlbums: [...totalAlbums],
        path: [...this.state.path, { id: id, name: name }],
        nextAlbums: newNodes,
      });
    },

    prevOnClick: async (id) => {
      const [newNodes, totalAlbums] = await this.getNodes(id);
      const newPath = [...this.state.path];
      newPath.pop();
      this.setState({
        totalAlbums: [...totalAlbums],
        path: [...newPath],
        nextAlbums: newNodes,
      });
    },
  });

  this.setState = (newState) => {
    this.state = newState;
    this.breadcrumb.setState(this.state.path);
    this.contents.setState(this.state);
  };
}
