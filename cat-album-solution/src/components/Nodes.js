export default function Nodes({ $app, onClick, onBackClick }) {
  this.onBackClick = onBackClick;
  this.onClick = onClick;
  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = (newState) => {
    this.state = newState; // !: 전역이 아니어도 돼??
    this.render();
  };

  this.render = () => {
    console.log(this.state);
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "./assets/file.png"
              : "./assets/directory.png";

          return `
					<div class="Node" data-node-id="${node.id}">
						<img src="${iconPath}"/>
						<div> ${node.name}</div>
					</div>`;
        })
        .join("");

      this.$target.innerHTML = !this.state.isRoot
        ? `<div class="Node"><img src="/assets/prev.png"></div>${nodesTemplate}`
        : nodesTemplate;
    }
  };

  this.$target.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");

    if ($node) {
      const { nodeId } = $node.dataset;
      if (!nodeId) {
        this.onBackClick();
        return;
      }

      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
      if (selectedNode) {
        this.onClick(selectedNode);
      }
    }
  });
}

// 이벤트 위임 하기 전
//   this.$target.querySelectorAll(".Node").forEach(($node) => {
//     $node.addEventListener("click", (e) => {
//       const { nodeId } = e.target.dataset;
//       if (!nodeId) {
//         this.onBackClick();
//       }
//       const selectedNode = this.state.find((node) => node.id === nodeId);

//       if (selectedNode) {
//         this.onClick(selectedNode);
//       }
//     });
//   });
// };
