import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "./App.css";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import useHttp from "./hooks/use-http";
import { fetchData } from "./lib/api";

function App() {
  const { sendRequest, status } = useHttp(fetchData);

  useEffect(() => {
    if (!status) {
      sendRequest("products", 'LIST');
    }
  }, [sendRequest, status]);

  return (
    <div className="App">
      {status === "pending" && <p>Loading...</p>}
      <Routes>
        <Route path="/" element={<Navigate replace to="/web" />} />
        <Route path="/web" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
