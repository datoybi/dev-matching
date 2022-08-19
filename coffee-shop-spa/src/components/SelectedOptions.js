export default function SelectedOptions({ $target, initialState }) {
  const $component = document.createElement("div");
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
					<div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
					<button class="OrderButton">주문하기</button>
			`;
    }
  };

  this.render();
}
