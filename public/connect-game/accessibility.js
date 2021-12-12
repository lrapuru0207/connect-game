document.addEventListener("keydown", (e) => {
    const allowedArrowKeys = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
    ];
    if (!allowedArrowKeys.includes(e.code)) return;

    const isBoardButtonActive = document.activeElement.tagName === "BUTTON";

    if (!isBoardButtonActive) {
        // make first button as active
        document.querySelector(".board button").focus();
        return;
    }

    const activeCell = document.activeElement.parentElement;
    const activeRow = activeCell.parentElement;
    const activeCellIndex = [...activeRow.children].indexOf(activeCell);

    switch (e.code) {
        case "ArrowRight": {
            const rightCell = activeCell.nextElementSibling;
            if (rightCell)
                activeCell.nextElementSibling.firstElementChild.focus();
            break;
        }
        case "ArrowLeft": {
            const leftCell = activeCell.previousElementSibling;
            if (leftCell)
                activeCell.previousElementSibling.firstElementChild.focus();
            break;
        }
        case "ArrowUp": {
            const upRow = activeRow.previousElementSibling;
            if (upRow)
                upRow.children[activeCellIndex].firstElementChild.focus();
            break;
        }
        case "ArrowDown": {
            const downRow = activeRow.nextElementSibling;
            if (downRow)
                downRow.children[activeCellIndex].firstElementChild.focus();
        }
    }
});
