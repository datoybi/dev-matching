import { request } from "../utils/api.js";
import { ProductDetail } from "./ProductDetail.js";

export default function ProductDetailPage({ $target, productId }) {
  this.state = {
    productId,
    product: null,
  };

  const $page = document.createElement("div");
  $page.className = "ProductDetailPage";
  this.$target = $target;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
    // this.state 잘 들어갔음
  };

  this.fetchProductsDetail = async () => {
    const product = await request(`products/${this.state.productId}`);
    this.setState({ ...this.state, product });
  };

  this.render = () => {
    if (!this.state.product) {
      $target.innerHTML = "Loading...";
    } else {
      $target.innerHTML = "";
      $target.appendChild($page);
      this.productDetail = new ProductDetail({
        $target: $page,
        initialState: {
          product: this.state.product,
          selectedOptions: [],
        },
      });
    }
  };

  this.fetchProductsDetail();
}
