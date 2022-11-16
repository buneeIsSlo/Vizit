export const grid = () => {
    const gridContainer = document.querySelector(".grid");

    const renderGrid = () => {
        gridContainer.innerHTML = "";

        const size = gridContainer.clientWidth > 500 ? 35 : 30;

        let rows = Math.floor(gridContainer.clientHeight / size);
        let columns = Math.floor(gridContainer.clientWidth / size);

        populateGrid(rows, columns);
    }

    const populateGrid = (rows, columns) => {

        gridContainer.style.setProperty("--rows", rows);
        gridContainer.style.setProperty("--columns", columns);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let node = createNode();
                gridContainer.appendChild(node);
            }
        }
    }

    const createNode = () => {
        const node = document.createElement("button");
        node.classList.add("grid__node");

        return node;
    }

    return {
        renderGrid,
    }
}


