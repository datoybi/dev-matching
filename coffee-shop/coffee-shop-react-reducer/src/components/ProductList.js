import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import ProductContext from "../store/product-context";
import classes from "./ProductList.module.css";
import useHttp from "../hooks/use-http";
import { fetchData } from "../lib/api";

const ProductList = () => {
  const { productsList } = useContext(ProductContext);
  const { sendRequest } = useHttp(fetchData);
  const { navigate } = useNavigate();

  const onClickhandler = (event) => {
    const li = event.target.closest("li");
    const productId = li.dataset.id;
    sendRequest(`products/${productId}`, "DETAIL");
    navigate(`/products/${productId}`);
  };

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
