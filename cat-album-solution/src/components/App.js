import { request } from "../api.js";
import Breadcrumb from "./Breadcrumb.js";
import Loading from "./Loading.js";
import Nodes from "./Nodes.js";
import ImageView from "./ImageView.js";

const cache = {};

export default function App({ $app }) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  };

  const loading = new Loading({ $app, initialState: this.state.isLoading });

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
    onClick: (index) => {
      if (index === null) {
        this.setState({
          ...this.state,
          depth: [],
          nodes: cache.root,
        });
        return;
      }
      if (index === this.state.depth.lenght - 1) {
        return;
      }
      const nextState = { ...this.state };
      const nextDepth = this.state.depth.slice(0, index + 1);
      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length - 1].id],
      });
    },
  });

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedFilePath,
  });

  const nodes = new Nodes({
    $app,
    initialState: [],
    onClick: async (node) => {
      try {
        if (node.type === "DIRECTORY") {
          if (cache[node.id]) {
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: cache[node.id],
            });
          } else {
            loading.setState(true);
            const nextNodes = await request(`/${node.id}`);
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
              isRoot: false,
            });
            loading.setState(false);
            cache[node.id] = nextNodes;
          }
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
            isRoot: false,
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    onBackClick: async () => {
      try {
        const newState = { ...this.state };
        newState.depth.pop();

        const prevNodeId =
          newState.depth.length === 0
            ? null
            : newState.depth[newState.depth.length - 1].id;
        if (prevNodeId === null) {
          this.setState({
            ...newState,
            isRoot: true,
            nodes: cache.root,
          });
        } else {
          const prevNodes = await request(prevNodeId);
          this.setState({
            ...newState,
            isRoot: false,
            nodes: cache[prevNodes],
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    },
  });

  this.setState = (nextState) => {
    console.log(JSON.stringify(cache, null, 2));
    this.state = nextState;
    breadcrumb.setState(this.state.path);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
    loading.setState(this.state.isLoading);
  };

  const init = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    try {
      const rootNodes = await request("");
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

  init();
}
