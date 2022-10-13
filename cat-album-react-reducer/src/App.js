import { useEffect, useContext } from "react";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { fetchNodes } from "./lib/api";
import useHttp from "./hooks/use-http";
import NodesContext from "./store/nodes-context";
import Loading from "./components/Modal/Loading";

const App = () => {
  const { sendRequest, status, data } = useHttp(fetchNodes);
  const nodesCtx = useContext(NodesContext);

  useEffect(() => {
    sendRequest("");
  }, [sendRequest]);

  useEffect(() => {
    if (
      status === "completed" &&
      nodesCtx.nodes.length === 0 &&
      data.length > 0
    ) {
      nodesCtx.onChange({
        id: "",
        name: "root",
        data,
        type: "INIT",
      });
    }
  }, [data, status, nodesCtx]);

  return (
    <>
      {status === "pending" && <Loading />}
      <Header />
      <Main />
    </>
  );
};

export default App;
