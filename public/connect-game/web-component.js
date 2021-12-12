(function () {
    class ConnectGame extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "open" });
            this.initialize();
        }

        async initialize() {
            const gameContainer = document.createElement("div");
            gameContainer.innerHTML = `
      		<style>
				.board {
					background: yellow;
					text-align: center;
					display: inline-block;
				}
				.row {
					display: flex;
				}
				.col {
					height: 70px;
					width: 70px;
					border-radius: 50%;
					margin: 5px;
					background: #fff;
				}

				.next-red {
					background: red;
					opacity: 0.5;
				}

				.next-black {
					background: black;
					opacity: 0.5;
				}

				.red {
					background: red;
					opacity: 1;
				}

				.black {
					background: black;
					opacity: 1;
				}
      		</style>
			<div class="board" id="target"></div>
			`;

            this.shadow.appendChild(gameContainer);

            const { Connect } = await import("./connect.js");
            const { rows, cols } = this.dimensions;
            new Connect(rows, cols, this.shadow.getElementById("target"));
        }

        get dimensions() {
            const obj = {
                rows: 0,
                cols: 0,
            };

            [...this.attributes].forEach((attr) => {
                if (attr.name.includes("rows")) {
                    obj.rows = attr.value;
                }
                if (attr.name.includes("cols")) {
                    obj.cols = attr.value;
                }
            });

            return obj;
        }
    }
    customElements.define("connect-game", ConnectGame);
})();
