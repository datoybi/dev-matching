import { routeChange } from "../router.js";
import { getItem, setItem } from "../utils/Storage.js";

export default function SelectedOptions({ $target, initialState }) {
  const $component = document.createElement("div");
  $target.innerHTML = "";
  $target.appendChild($component);

  this.state = initialState;

  // 상품가격 총합 구하기
  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state;
    const { price: productPrice } = product;
    return selectedOptions.reduce(
      (acc, option) =>
        acc + (productPrice + option.optionPrice) * option.quantity,
      0
    );
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { product, selectedOptions = [] } = this.state;
    if (product && selectedOptions) {
      $component.innerHTML = `
			<h3>선택된 상품</h3>
			<ul>
				${selectedOptions
          .map(
            (selectedOption) => `<li>${selectedOption.optionName} ${
              product.price + selectedOption.optionPrice
            }원 <input type="text" data-optionId="${
              selectedOption.optionId
            }" value="${selectedOption.quantity}">
						</li>`
          )
          .join("")}
					</ul>
					<div class="ProductDetail__totalPrice">${this.getTotalPrice().toLocaleString(
            "ko-KR"
          )}원</div>
					<button class="OrderButton">주문하기</button>
			`;
    }
  };

  $component.addEventListener("change", (e) => {
    if (e.target.tagName === "INPUT") {
      try {
        const nextQuantity = parseInt(e.target.value);
        const nextSelectedOptions = [...this.state.selectedOptions];
        // input의 값이 숫자인 경우에만 처리하기
        if (typeof nextQuantity === "number") {
          const { product } = this.state;

          const optionId = parseInt(e.target.dataset.optionid);
          const option = product.productOptions.find(
            (option) => option.id === optionId
          );
          const selectedOptionIndex = nextSelectedOptions.findIndex(
            (selectedOption) => selectedOption.optionId === optionId
          );
          // input에 입력한 값이 재고수량을 넘을 경우 재고수량으로 입력한 것으로 바꿔버리기
          nextSelectedOptions[selectedOptionIndex].quantity =
            option.stock >= nextQuantity ? nextQuantity : option.stock;

          this.setState({
            ...this.state,
            selectedOptions: nextSelectedOptions,
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  });

  $component.addEventListener("click", (e) => {
    const { selectedOptions } = this.state;
    if (e.target.className === "OrderButton") {
      const cartData = getItem("products_cart", []);
      setItem(
        "products_cart",
        cartData.concat(
          selectedOptions.map((selectedOption) => ({
            productId: selectedOption.productId,
            optionId: selectedOption.optionId,
            quantity: selectedOption.quantity,
          }))
        )
      );
      routeChange("/cart");
    }
  });
  this.render();
}
