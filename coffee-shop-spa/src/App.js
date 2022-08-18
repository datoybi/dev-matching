import CartPage from "./components/CartPage.js";
import ProductDetailPage from "./components/ProductDetailPage.js";
import ProductListPage from "./components/ProductListPage.js";
import { init } from "./router.js";

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    console.log(pathname);
    $target.innerHTML = "";

    if (pathname === "/web/" || "/") {
      new ProductListPage({ $target });
      // history.pushState(null, "", "/web");
    } else if (pathname.indexOf("/products?") === 0) {
      const [, , productId] = pathname.split("/");
      console.log(productId);
      new ProductDetailPage({ $target, productId }).render();
    } else if (pathname === "/cart") {
      new CartPage({ $target }).render();
    }
  };

  // ROUTE_CHANGE 이벤트 발생 시 마다 APP의 this.route 함수가 호출되게 하는 효과
  init(this.route);
  this.route();
  // 뒤로가기, 앞으로가기 발생 시 popstate 이벤트가 발생합니다.
  window.addEventListener("popstate", this.route);
}
