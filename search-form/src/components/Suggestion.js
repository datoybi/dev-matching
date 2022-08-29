export default function Suggestion({
  $app,
  initialState,
  onSelectedChange,
  onClick,
  onSubmit,
}) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "Suggestion";
  this.onSelectedChange = onSelectedChange;
  this.onClick = onClick;
  this.onSubmit = onSubmit;

  this.render = () => {
    const { keyword, suggestion, selectedIndex } = this.state;
    if (suggestion.length === 0) {
      this.$target.style.display = "none";
      // display 조작이 잘한건지 모르겠음
    } else {
      this.$target.style.display = "block";
      $app.appendChild(this.$target);
      console.log(suggestion);
      this.$target.innerHTML = `
				<ul>
						${suggestion
              .map(
                (element, index) =>
                  `<li${
                    index === selectedIndex
                      ? ` class="Suggestion__item--selected">`
                      : ">"
                  }${element.replace(
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
      // this.$target.focus();
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
    } else if (e.key === "Enter") {
      this.onSubmit();
    }
  });
}
