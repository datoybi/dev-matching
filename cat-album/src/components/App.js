import Nodes from "./Nodes.js";
import Breadcrumb from "./Breadcrumb.js";
import { request } from "../api.js";
import Loading from "./Loading.js";
import ImageViewer from "./ImageViewer.js";

const cache = {};

export default function App({ $app }) {
  this.state = {
    path: [],
    nodes: [],
    isLoading: false,
    isRoot: true,
    imageViewerPath: null,
  };

  const loading = new Loading({ $app });

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.path,
    onClick: async (id) => {
      if (!id) {
        // root
        this.setState({
          ...this.state,
          path: [],
          nodes: cache["root"],
          isRoot: true,
          imageViewerPath: "",
        });
        return;
      } else {
        const idx = this.state.path.findIndex((el) => el.id === id);
        const nextPath = [...this.state.path].slice(0, idx + 1);
        this.setState({
          ...this.state,
          path: [...nextPath],
          nodes: cache[id],
          imageViewerPath: "",
        });
      }
    },
  });
  const nodes = new Nodes({
    $app,
    initialState: this.state,
    onClick: async (node) => {
      try {
        const nodeId = !node.id ? "root" : node.id;
        if (node.type === "DIRECTORY") {
          loading.setState(true);
          let nextNodes = cache[node.id];
          if (!nextNodes) {
            nextNodes = await request(nodeId);
            cache[nodeId] = nextNodes;
          }
          const isRoot = nextNodes.some((el) => !el.parent);
          loading.setState(false);
          this.setState({
            ...this.state,
            path: [...this.state.path, { id: node.id, name: node.name }],
            nodes: nextNodes,
            isRoot,
            imageViewerPath: "",
          });
        } else {
          this.setState({
            ...this.state,
            imageViewerPath: node.filePath,
            isRoot: false,
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    },

    prevOnClick: async () => {
      try {
        const newPath = [...this.state.path];
        newPath.pop();
        const nextNodeId =
          newPath.length === 0 ? "root" : newPath[newPath.length - 1].id;
        const nextNodes = cache[nextNodeId];
        const isRoot = nextNodes.some((el) => !el.parent);
        this.setState({
          ...this.state,
          path: [...newPath],
          nodes: nextNodes,
          isRoot,
          imageViewerPath: "",
        });
      } catch (e) {
        console.log(e.message);
      }
    },
  });
  const imageViewer = new ImageViewer({
    $app,
    initialState: this.state.imageViewerPath,
  });

  this.init = async () => {
    this.setState({ ...this.state, isLoading: true });
    try {
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isLoading: false,
        isRoot: true,
        nodes: rootNodes,
      });
      cache.root = rootNodes;
    } catch (e) {
      console.log(e.message);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    breadcrumb.setState(this.state.path);
    nodes.setState(this.state);
    loading.setState(this.state.isLoading);
    imageViewer.setState(this.state.imageViewerPath);
  };

  this.init();
}
