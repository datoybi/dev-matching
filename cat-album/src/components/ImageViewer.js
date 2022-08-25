const IMAGE_PATH_PREFIX =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageViewer({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "Modal ImageViewer";
  $app.appendChild(this.$target);

  this.render = () => {
    this.$target.innerHTML = `
			<div class="content">
				${this.state ? `<img src="${IMAGE_PATH_PREFIX}${this.state}">` : ``}
			</div>`;
    this.$target.style.display = this.state ? "block" : "none";
  };

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  window.addEventListener("keyup", (e) => {
    if (this.$target.style.display === "block" && e.key === "Escape") {
      this.$target.style.display = "none";
    }
  });
}
