import SelectedOptions from "./SelectedOptions.js";

export function ProductDetail({ $target, initialState }) {
  let isInitialized = false;
  this.state = initialState;
  const $ProductDetail = document.createElement("div");
  $ProductDetail.className = "ProductDetail";
  $target.innerHTML = `<h1>${this.state.product.name} 상품 정보</h1>`;
  $target.appendChild($ProductDetail);

  let selectedOptions = null;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  if (selectedOptions) {
    selectedOptions.setState({
      selectedOptions: this.state.selectedOptions,
    });
  }

  this.render = () => {
    const { product } = this.state;

    // 아래 코드는 1회만 실행됩니다.
    if (!isInitialized) {
      $ProductDetail.innerHTML = `
			<img src="${product.imageUrl}"/>
			<div class="ProductDetail__info">
				<h2>${product.name}</h2>
				<div class="ProductDetail__price">${product.price.toLocaleString(
          "ko-KR"
        )}원~</div>
				<select>
					<option>선택하세요.</option>
					${product.productOptions
            .map(
              (productOption) =>
                `<option value="${productOption.id}" ${
                  productOption.stock === 0 ? " disabled>(품절)" : ">"
                } ${product.name} ${productOption.name} ${
                  productOption.price > 0
                    ? `(+${productOption.price.toLocaleString("ko-KR")}원)`
                    : ``
                }</option>`
            )
            .join("")}
				</select>
				<div class="ProductDetail__selectedOptions">
				</div>
			</div>
    `;
    }

    selectedOptions = new SelectedOptions({
      $target: $ProductDetail.querySelector(".ProductDetail__selectedOptions"),
      initialState: {
        product: this.state.product,
        selectedOptions: this.state.selectedOptions,
      },
    });
    isInitialized = true;
  };

  this.render();

  $ProductDetail.addEventListener("change", (e) => {
    if (e.target.tagName === "SELECT") {
      const selectedOptionId = parseInt(e.target.value);
      const { product, selectedOptions } = this.state;
      // 옵션 데이터에서 현재 선택한 optionId가 존재하는지 찾기 (정확도 체크)
      const option = product.productOptions.find(
        (option) => option.id === selectedOptionId
      );
      // 중복체크
      const selectedOption = selectedOptions.find(
        (selectedOption) => selectedOption.optionId === selectedOptionId
      );

      if (option && !selectedOption) {
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1,
          },
        ];
        this.setState({
          ...this.state,
          selectedOptions: nextSelectedOptions,
        });
      }
    }
  });
}
