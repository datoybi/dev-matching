export default function Suggestion({
  $app,
  initialState,
  onSelectedChange,
  onClick,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "Suggestion";
  this.onSelectedChange = onSelectedChange;
  this.onClick = onClick;

  this.render = () => {
    const { keyword, suggestion, selectedIndex } = this.state;
    if (suggestion.length === 0) {
      this.$target.style.display = "none";
      // display 조작이 잘한건지 모르겠음
    } else {
      this.$target.style.display = "block";
      $app.appendChild(this.$target);
      this.$target.innerHTML = `
					<ul>
							${suggestion
                .map(
                  (suggestion, index) =>
                    `<li${
                      index === selectedIndex
                        ? ` class="Suggestion__item--selected">`
                        : ">"
                    }${suggestion.replace(
                      /keyword/i,
                      `<span class="Suggestion__item--matched">${keyword}</span>`
                    )}</li>`
                )
                .join("")}
					</ul>`;
    }
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.$target.addEventListener("click", (e) => {
    console.log(e.target.innerHTML);
    if (e.target.innerHTML) {
      this.onClick(e.target.innerHTML);
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const { selectedIndex, suggestion } = this.state;
      let nextSelectedIndex = null;
      // document.querySelector(".SearchInput__input").blur();
      this.$target.focus();
      if (selectedIndex === -1) {
        nextSelectedIndex = 0;
      } else {
        nextSelectedIndex =
          e.key === "ArrowDown"
            ? selectedIndex + 1 > suggestion.length - 1
              ? 0
              : selectedIndex + 1
            : selectedIndex - 1 >= 0
            ? selectedIndex - 1
            : suggestion.length - 1;
      }
      this.onSelectedChange(nextSelectedIndex);
    }
  });
}
