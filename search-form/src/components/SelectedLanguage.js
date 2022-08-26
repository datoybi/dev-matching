export default function SelectedLanguage({ $app, initialState, onClick }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "SelectedLanguage";
  this.onClick = onClick;
  $app.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = `
		<ul>${this.state.map((language) => `<li>${language}</li>`).join("")}</ul>`;
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.$target.addEventListener("click", (e) => {
    if (e.target.innerText) {
      this.onClick(e.target.innerText);
    }
  });
}
