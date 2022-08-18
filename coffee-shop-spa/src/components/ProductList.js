import { routeChange } from "../router.js";

export default function ProductList({ $target, initialState }) {
  const $productList = document.createElement("ul");
  $target.appendChild($productList);
  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) {
      return;
    }
    $productList.innerHTML = `
			${this.state
        .map(
          (product) =>
            `<li data-product-id="${product.id}" class="Product">
							<img src="${product.imageUrl}"/>
								<div class="Product__info">
									<div>${product.name}</div>
									<div>${product.price.toLocaleString("ko-KR")}원~</div>
								</div>
						</li>`
        )
        .join("")}`;
  };

  this.render();

  $productList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { productId } = $li.dataset;

    if (productId) {
      routeChange(`/products/${productId}`);
    }
  });
}
