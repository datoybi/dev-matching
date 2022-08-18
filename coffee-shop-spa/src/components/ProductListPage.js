import { fetchList } from "../utils/api.js";
import ProductList from "./ProductList.js";

export default function ProductListPage({ $target }) {
  const $page = document.createElement("div");
  $page.className = "ProductListPage";
  $page.innerHTML = "<h1>상품목록</h1>";
  this.$target = $target;

  this.setState = (newState) => {
    this.state = newState;
    this.productList.setState(newState);
  };

  const fetchProducts = async () => {
    const products = await fetchList("../products.json");
    this.setState(products);
  };

  this.render = () => {
    $target.appendChild($page);
  };

  fetchProducts();
  this.render();

  this.productList = new ProductList({
    $target: $page,
    initialState: this.state,
  });
}
