export default function Breadcrumb({ $app, initialState, onClick }) {
  this.state = initialState;
  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = `<div>root</div>${this.state
      .map((path) => `<div data-id="${path.id}">${path.name}</div>`)
      .join("")}`;
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();

  this.$target.addEventListener("click", (e) => {
    if (e.target.tagName === "DIV") {
      const { id } = e.target.dataset;
      onClick(id);
    }
  });
}
