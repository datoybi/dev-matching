export default function SearchInput({ $target, initialState, onChange }) {
  this.$element = document.createElement("form");
  this.$element.className = "SearchInput";
  this.state = initialState;

  $target.appendChild(this.$element);

  this.render = () => {
    this.$element.innerHTML = `<form class="SearchInput">
		<input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value=${this.state}>
	</form>`;
  };

  this.render();

  this.$element.focus();

  this.$element.addEventListener("keyup", (e) => {
    const actionIgnoreKeys = [
      "Enter",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];

    if (!actionIgnoreKeys.includes(e.key)) {
      onChange(e.target.value);
    }
  });

  this.$element.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  this.$element.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { index } = $li.dataset;
      try {
        onselect(this.state.items[parseInt(index)]);
      } catch (e) {
        alert("무언가 잘못되었습니다! 선택할 수 없습니다!");
      }
    }
  });
}
