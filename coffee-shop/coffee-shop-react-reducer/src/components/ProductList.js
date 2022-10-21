import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductContext from "../store/product-context";
import classes from "./ProductList.module.css";
import useHttp from "../hooks/use-http";
import { fetchData } from "../lib/api";

const ProductList = () => {
  const { productsList } = useContext(ProductContext);
  const { sendRequest, status } = useHttp(fetchData);
  const [selectedProductId, setSelectedProductId] = useState();
  const navigate = useNavigate();

  const onClickhandler = (event) => {
    const li = event.target.closest("li");
    const productId = li.dataset.id;
    sendRequest(`products/${productId}`, "DETAIL");
    setSelectedProductId(productId);
    // if (status === "completed") {
    //   navigate(`/products/${productId}`);
    // }
  };

  useEffect(() => {
    if (status === "completed") {
      navigate(`/products/${selectedProductId}`);
    }
  }, [status, navigate, selectedProductId]);

  return (
    <ul>
      {productsList.map((product) => (
        // <Link to={`/products/${product.id}`} key={product.id}>
        <li
          className={classes.Product}
          onClick={onClickhandler}
          data-id={product.id}
          key={product.id}
        >
          <img src={product.imageUrl} alt={product.name} />
          <div className={classes.Product__info}>
            <div>{product.name}</div>
            <div>{product.price.toLocaleString("ko-KR")}원~</div>
          </div>
        </li>
        // </Link>
      ))}
    </ul>
  );
};

export default ProductList;
