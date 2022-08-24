export default function Breadcrumb({ $target, initialState, onClick }) {
  this.state = initialState;
  this.$target = $target;
  const $breadcrumb = document.createElement("nav");
  $breadcrumb.className = "Breadcrumb";
  this.$target.appendChild($breadcrumb);

  this.render = () => {
    $breadcrumb.innerHTML = this.state
      .map((path) => `<div data-id="${path.id || "root"}">${path.name}</div>`)
      .join("");
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();

  $breadcrumb.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    onClick(id);
  });
}
