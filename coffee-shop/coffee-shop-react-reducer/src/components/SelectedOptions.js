import { useContext, useRef, useState } from "react";
import ProductContext from "../store/product-context";
import classes from "./SelectedOptions.module.css";

const SelectedOptions = (props) => {
  // const { selectedProduct } = useContext(ProductContext);

  console.log(props.selectedElement);
  const getTotalPrice = () => {
    // option의 price + 기본 가격 * 양
    // let totalPrice =
  };

  const onChangeQuantityHanlder = () => {};

  return (
    <>
      <h3>선택된 상품</h3>
      <ul>
        {props.selectedElement.map((option) => (
          <li key={option.id}>
            {option.name} {option.price.toLocaleString("ko-KR")}원
            <div>
              <input type="number" value={option.quantity} />
            </div>
          </li>
        ))}
      </ul>
      <div className={classes.ProductDetail__totalPrice}>
        {/* {selectedProduct.price.toLocaleString("ko-KR")}원 */}0원
      </div>
      <button className={classes.OrderButton}>주문하기</button>
    </>
  );
};

export default SelectedOptions;
