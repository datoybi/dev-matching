export default function Nodes({ $app, initialState, onClick, prevOnClick }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  this.onClick = onClick;
  this.prevOnClick = prevOnClick;
  $app.appendChild(this.$target);

  this.render = () => {
    // console.log(JSON.stringify(this.state, null, 2));
    this.$target.innerHTML = `${
      !this.state.isRoot
        ? `<div class="Node prev">
						<img src="./assets/prev.png">
					</div>`
        : ""
    }
		${this.state.nodes
      .map(
        (node) => `<div class="Node" data-node-id=${node.id}>
				<img src="./assets/${node.type === "DIRECTORY" ? "directory" : "file"}.png" />
				<div class="name">${node.name}</div>
				</div>`
      )
      .join("")}		
	`;
  };

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render();

  window.addEventListener("click", async (e) => {
    const $div = e.target.closest(".Node");
    if (e.target.closest(".Node")) {
      const nodeId = $div.dataset.nodeId;
      if (nodeId) {
        const selectedNode = this.state.nodes.find(
          (node) => node.id === nodeId
        );
        this.onClick(selectedNode);
      } else {
        this.prevOnClick(nodeId);
      }
    }
  });
}
