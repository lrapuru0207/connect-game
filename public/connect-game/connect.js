const STATUSCODES = {
    WIN: 1,
    TIE: 2,
};

class ConnectGame {
    constructor(rows, cols, gameContainer) {
        this.ROWS = rows;
        this.COLS = cols;
        this.CONNECT = 4;
        this.config = {
            player1Color: "red",
            player2Color: "black",
        };
        this.gameContainer = gameContainer;
        this.board = this.prepareBoard();
    }

    prepareBoard() {
        return Array(this.ROWS)
            .fill()
            .map(() => Array(this.COLS).fill(0));
    }

    initialize() {
        this.registerEvents();
        this.start();
    }

    start() {
        this.currentPlayer = 1;
        this.gameStatus = 0;
        this.board = this.prepareBoard();
        this.gameContainer.querySelector(".player-text").innerHTML =
            "The current player is: ";
        document.querySelector(
            ".player-name"
        ).innerHTML = `Player${this.currentPlayer}`;
        this.gameContainer.querySelector(".reset").style.display = "none";
        this.renderBoard();
    }

    renderBoard() {
        const tbody = document.createElement("tbody");
        for (let i = 0; i < this.board.length; i++) {
            const row = document.createElement("tr");
            row.className = "row";
            for (let j = 0; j < this.board[i].length; j++) {
                const col = document.createElement("td");
                const button = document.createElement("button");
                button.className = "col-button";
                button.setAttribute("data-col", j);
                button.setAttribute("data-row", i);
                col.appendChild(button);
                row.appendChild(col);
            }
            tbody.appendChild(row);
        }
        this.gameContainer.querySelector(".board").innerHTML = "";
        this.gameContainer.querySelector(".board").appendChild(tbody);
    }

    registerEvents() {
        this.gameContainer
            .querySelector(".board")
            .addEventListener("click", this.handleClick.bind(this));

        this.gameContainer
            .querySelector(".reset")
            .addEventListener("click", this.handleReset.bind(this));
    }

    handleReset() {
        this.start();
    }

    handleClick(event) {
        if (this.gameStatus === 1) return;

        const target = event.target;
        if (!target.classList.contains("col-button")) return;

        let { row, col } = target.dataset;
        row = parseInt(row);
        col = parseInt(col);
        if (this.isCellTaken(row, col)) {
            alert("This cell is already taken");
            return;
        }

        row = this.dropToBottom(row, col);
        this.updateBoard(row, col);
        if (this.checkForWin(row, col)) {
            this.gameContainer.querySelector(".player-text").innerHTML =
                "The winner is: ";
            this.gameStatus = STATUSCODES.WIN;
            this.gameContainer.querySelector(".reset").style.display = "flex";
            return;
        }
        this.updatePlayer();
    }

    updateBoard(row, col) {
        this.board[row][col] = this.currentPlayer;
        const cellElem = document.querySelector(
            `[data-row='${row}'][data-col='${col}']`
        );
        const key = `player${this.currentPlayer}Color`;
        cellElem.classList.add(`${this.config[key]}`);
    }

    updatePlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        document.querySelector(
            ".player-name"
        ).innerHTML = `Player${this.currentPlayer}`;
    }

    checkForWin(row, col) {
        if (this.getCellValue(row, col) === 0) return false;

        // check for horizontal
        if (
            this.getAdj(row, col, 0, 1) + this.getAdj(row, col, 0, -1) >=
            this.CONNECT - 1
        )
            return true;

        // check for vertical
        if (this.getAdj(row, col, 1, 0) >= this.CONNECT - 1) return true;

        // check for left diagnal
        if (
            this.getAdj(row, col, 1, 1) + this.getAdj(row, col, -1, -1) >=
            this.CONNECT - 1
        )
            return true;

        // check for right diagnal
        if (
            this.getAdj(row, col, -1, 1) + this.getAdj(row, col, 1, -1) >=
            this.CONNECT - 1
        )
            return true;

        return false;
    }

    getAdj(row, col, row_inc, col_inc) {
        if (
            this.getCellValue(row, col) ===
            this.getCellValue(row + row_inc, col + col_inc)
        )
            return (
                1 + this.getAdj(row + row_inc, col + col_inc, row_inc, col_inc)
            );
        return 0;
    }

    getCellValue(row, col) {
        if (this.board[row] === undefined || this.board[row][col] === undefined)
            return -1;
        return this.board[row][col];
    }

    dropToBottom(row, col) {
        for (let x = this.ROWS - 1; x >= 0; x--)
            if (this.getCellValue(x, col) === 0) return x;

        return row;
    }

    isCellTaken(row, col) {
        const cellValue = this.getCellValue(row, col);
        return cellValue !== -1 && cellValue !== 0;
    }
}
