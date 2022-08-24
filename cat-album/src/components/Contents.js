import { setLoading } from "../utils.js";

export default function Contents({
  $target,
  initialState,
  onClick,
  prevOnClick,
}) {
  this.state = initialState;
  this.$target = $target;
  const $nodes = document.createElement("div");
  $nodes.className = "Nodes";
  $target.appendChild($nodes);

  this.render = () => {
    // console.log(JSON.stringify(this.state, null, 2));
    $nodes.innerHTML = `${
      this.state.path.length > 1
        ? `<div class="Node prev">
						<img src="./assets/prev.png">
					</div>`
        : ""
    }
		${this.state.nextAlbums
      .map(
        (node) => `<div data-id=${node.id} ${
          node.filePath ? `data-file-path=${node.filePath}` : ``
        } class="Node">
				<img src="./assets/${node.type === "DIRECTORY" ? "directory" : "file"}.png" />
				<div class="name">${node.name}</div>
				</div>`
      )
      .join("")}		
	`;
    setLoading();
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();

  window.addEventListener("keyup", (e) => {
    const $ImageViewer = document.querySelector(".ImageViewer");
    if (e.key === "Escape") {
      $ImageViewer.classList.add("hide");
    }
  });

  window.addEventListener("click", async (e) => {
    const $div = e.target.closest("div");
    const $ImageViewer = document.querySelector(".ImageViewer");
    const $img = $ImageViewer.querySelector("img");

    if ($div && $div.classList.contains("Node")) {
      if ($div.dataset.filePath) {
        $ImageViewer.classList.remove("hide");
        $img.src = `.${$div.dataset.filePath}`;
      } else if ($div.classList.contains("prev")) {
        const { path } = this.state;
        const nextId = path[path.length - 2].id;
        prevOnClick(nextId);
      } else {
        onClick($div.dataset.id, $div.querySelector(".name").innerText || null);
      }
    }
    if (!$ImageViewer.classList.contains("hide") && e.target === $ImageViewer) {
      $ImageViewer.classList.add("hide");
    }
  });
}
