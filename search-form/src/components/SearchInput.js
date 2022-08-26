export default function SearchInput({ $app, initialState, onInput, onSubmit }) {
  this.state = initialState;
  this.$target = document.createElement("form");
  this.$target.className = "SearchInput";
  $app.appendChild(this.$target);
  this.onInput = onInput;
  this.onSubmit = onSubmit;

  this.render = () => {
    this.$target.innerHTML = `<form class="SearchInput">
			<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value=${
        this.state ? `${this.state.keyword}` : ""
      }>
		</form>`;
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.$target.addEventListener("input", (e) => {
    this.onInput(e.target.value);
  });
  this.$target.addEventListener("submit", (e) => {
    e.preventDefault();
    this.onSubmit();
  });
}
