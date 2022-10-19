import { useContext } from "react";

import SelectedOptions from "./SelectedOptions";
import classes from "./ProductDetail.module.css";
import ProductContext from "../store/product-context";

const ProductDetail = () => {
  const { selectedProduct } = useContext(ProductContext);
  console.log(selectedProduct);

  return (
    <div className={classes.ProductDetail}>
      <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
      <div className={classes.ProductDetail__info}>
        <h2>{selectedProduct.name}</h2>
        <div className={classes.ProductDetail__price}>10,000원~</div>
        <select>
          <option>선택하세요.</option>
          {/* {selectedProduct.productOptions.map((option) => (
            <option key={option.id}>{option.name}</option>
          ))} */}
          <option>100개 번들</option>
          <option>1000개 번들(+5,000)</option>
        </select>
        <div className={classes.ProductDetail__selectedOptions}>
          <h3>선택된 상품</h3>
          <SelectedOptions />
          <div className={classes.ProductDetail__totalPrice}>
            {selectedProduct.price.toLocaleString("ko-KR")}원
          </div>
          <button className={classes.OrderButton}>주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
