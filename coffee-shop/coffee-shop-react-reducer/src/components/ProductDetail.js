import { useContext, useState } from "react";

import SelectedOptions from "./SelectedOptions";
import classes from "./ProductDetail.module.css";
import ProductContext from "../store/product-context";

const ProductDetail = () => {
  const { selectedProduct } = useContext(ProductContext);
  const [selectedElement, setSelectedElement] = useState([]);
  // onChnage있을때 qunatity 바꾸기

  const onChangeHanlder = (event) => {
    // quantity 갯수 1로 해서 보내기
    const selectedOptionId = event.target.value;
    let selected = selectedProduct.productOptions.find(
      (option) => option.id === +selectedOptionId
    );
    selected = {
      ...selected,
      quantity: 1,
      originalPrice: selectedProduct.price,
    };
    setSelectedElement((prevState) => [...prevState, selected]);
  };

  const onQuantityHanlder = () => {};

  return (
    <div className={classes.ProductDetail}>
      <img src={selectedProduct.imageUrl} alt={selectedProduct.name} />
      <div className={classes.ProductDetail__info}>
        <h2>{selectedProduct.name}</h2>
        <div className={classes.ProductDetail__price}>
          {selectedProduct.price.toLocaleString("ko-KR")}원~
        </div>
        <select onChange={onChangeHanlder}>
          <option>선택하세요.</option>
          {selectedProduct.productOptions.map((option) => (
            <option
              value={option.id}
              key={option.id}
              disabled={option.stock === 0}
            >
              {option.stock === 0 && "(품절) "}
              {selectedProduct.name} {option.name}
              {option.price > 0
                ? `(+${option.price.toLocaleString("ko-KR")}원)`
                : ""}
            </option>
          ))}
        </select>
        <div className={classes.ProductDetail__selectedOptions}>
          <SelectedOptions
            selectedElement={selectedElement}
            onQuantityHanlde={onQuantityHanlder}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
