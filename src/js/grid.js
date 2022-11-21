import { Node } from "./Node";

export const grid = () => {
    // Constants
    const gridContainer = document.querySelector(".grid");

    // Variables
    let nodesArray = null,
        drawState = false,
        emptyClass = "grid__node empty",
        wallClass = "grid__node wall",
        startClass = "grid__node start",
        endClass = "grid__node end";

    const renderGrid = () => {
        gridContainer.innerHTML = "";
        nodesArray = new Array();

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
            node.className = wallClass;
        }
        else if (node.classList.contains("wall")) {
            node.className = emptyClass;
        }
    }

    const addStartandEndNodes = (sRow, sCol, eRow, eCol) => {
        let startNode = nodesArray[sRow][sCol];
        let endNode = nodesArray[eRow][eCol];

        startNode.className = startClass;
        startNode.draggable = true;
        endNode.className = endClass;
        endNode.draggable = true;

        handleDragAndDrop([startNode, endNode]);
    }

    const handleDragAndDrop = (draggableNodes) => {
        let draggedNode = null;
        let allNodes = document.querySelectorAll(".grid__node");

        draggableNodes.forEach((node) => {
            node.addEventListener("dragstart", (event) => {
                draggedNode = event.target;
            });
        });

        allNodes.forEach((node) => {
            node.addEventListener("dragover", (event) => {
                if (node.classList.contains("start") || node.classList.contains("end")) {
                    return;
                }

                event.preventDefault();
            });

            node.addEventListener("drop", (event) => {
                if (node.classList.contains("start") || node.classList.contains("end")) {
                    return;
                }

                event.preventDefault();
                let targetNode = event.target;
                let targetClass = draggedNode.className;

                draggedNode.className = emptyClass;
                draggedNode.removeAttribute("draggable");

                targetNode.className = targetClass;
                targetNode.draggable = true;
                targetNode.addEventListener("dragstart", (event) => {
                    draggedNode = event.target;
                });
            });
        });
    }

    gridContainer.addEventListener("mousedown", (event) => {
        if (event.target.classList.contains("start") || event.target.classList.contains("end")) {
            return;
        }

        drawState = true;
    });
    gridContainer.addEventListener("mouseup", () => drawState = false);
    gridContainer.addEventListener("mouseleave", () => drawState = false);

    return {
        renderGrid,
        nodesArray
    }
}


