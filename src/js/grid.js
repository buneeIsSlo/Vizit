import { Node } from "./Node";

export const grid = () => {
    const gridContainer = document.querySelector(".grid");
    const nodesArray = new Array();
    let drawState = false;

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
            nodesArray.push([]);

            for (let j = 0; j < columns; j++) {
                let node = Node().createNode();

                addNodeProperties(node);

                nodesArray[i].push(node);

                gridContainer.appendChild(node);
            }
        }

        addStartandEndNodes(1, 1, nodesArray.length - 2, nodesArray[0].length - 2);
    }

    const addNodeProperties = (node) => {
        node.addEventListener("mouseenter", () => {
            if (!drawState) return;

            toggleNode(node);
        });

        node.addEventListener('mousedown', () => {
            toggleNode(node);
        });
    }

    const toggleNode = (node) => {
        if (node.classList.contains("empty")) {
            node.className = "grid__node wall";
        }
        else if (node.classList.contains("wall")) {
            node.className = "grid__node empty";
        }
    }

    const addStartandEndNodes = (sRow, sCol, eRow, eCol) => {
        let startNode = nodesArray[sRow][sCol];
        let endNode = nodesArray[eRow][eCol];
        let nodes = document.querySelectorAll(".grid__node");
        let dragged = null;

        startNode.className = "grid__node start";
        startNode.draggable = true;
        endNode.className = "grid__node end";
        endNode.draggable = true;

        startNode.addEventListener("dragstart", (event) => {
            dragged = event.target;
        })

        nodes.forEach(node => {
            node.addEventListener("dragover", (event) => {
                event.preventDefault()
            })

            node.addEventListener("dragend", (event) => {
                if (event.target.classList.contains("start")) {
                    console.log(event.toElement);
                    node.className = "grid__node start"
                }
                node.className = "grid__node empty";

                node.draggable = false;
            })

            node.addEventListener("drop", (event) => {
                event.preventDefault();
                if (event.target.classList.contains("start")) {
                    node.className = "grid__node start"
                }
                else if (event.toElement.classList.contains("wall") || event.toElement.classList.contains("empty")) {
                    event.target.className = "grid__node start";
                    event.target.draggable = true;
                }

            });
        });
    }

    gridContainer.addEventListener("mousedown", (event) => {
        if (!event.target.classList.contains("start")) {
            drawState = true;
        }
    });
    gridContainer.addEventListener("mouseup", () => drawState = false);
    gridContainer.addEventListener("mouseleave", () => drawState = false);

    return {
        renderGrid,
    }
}


