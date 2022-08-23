export default function Breadcrumb({ $target, initialState }) {
  this.state = initialState;
  this.$target = $target;
  const $breadcrumb = document.createElement("nav");
  $breadcrumb.className = "Breadcrumb";
  this.$target.appendChild($breadcrumb);

  this.render = () => {
    $breadcrumb.innerHTML = this.state
      .map((path) => `<div">${path.name}</div>`)
      .join("");
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();
}
