import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { fetchNodesData } from "./store/nodes-actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNodesData(""));
  }, [dispatch]);

  return (
    <>
      {/* {status === "pending" && <Loading />} */}
      <Header />
      <Main />
    </>
  );
};

export default App;
