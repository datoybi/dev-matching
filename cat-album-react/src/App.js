import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NodesProvider from "./store/NodesProvider";
import ImageView from "./components/Modal/ImageView";
import { useState } from "react";

const App = () => {
  const [filePath, setFilePath] = useState(null);

  const onCloseHandler = () => {
    setFilePath(null);
  };

  const getFilePath = (filePath) => {
    setFilePath(filePath);
  };

  return (
    <NodesProvider>
      {filePath && <ImageView onClose={onCloseHandler} filePath={filePath} />}
      <Header />
      <Main filePath={getFilePath} />
    </NodesProvider>
  );
};

export default App;
