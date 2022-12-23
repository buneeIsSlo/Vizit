import { Node } from "./Node";
import { switchNodeClassTo, isVisualizing, setVisualizingState } from "./Util";
import { AStarFinder, BreadthFirstFinder, DepthFirstFinder } from "./Path-finding algorithms/path-finders";
import { Prims, RecursiveBacktracker } from "./Maze algorithms/maze-generator";

export const Grid = () => {
    // Constants
    const gridContainer = document.querySelector(".grid");

    // Variables
    let nodesArray = null,
        drawState = false,
        emptyClass = "grid__node empty",
        wallClass = "grid__node wall",
        startClass = "grid__node start",
        endClass = "grid__node end",
        startRow, startCol, endRow, endCol;

    const renderGrid = () => {
        gridContainer.innerHTML = "";
        nodesArray = new Array();

        const size = gridContainer.clientWidth > 500 ? 25 : 30;

        let rows = Math.floor(gridContainer.clientHeight / size);
        let columns = Math.floor(gridContainer.clientWidth / size);

        populateGrid(rows, columns);
    };

    const createMaze = (algoType) => {
        if (isVisualizing()) {
            return;
        }

        clearGrid();

        /* eslint-disable */
        switch (algoType) {
            case "prims":
                Prims().generateMaze(nodesArray, 0, 0);
                break;
            case "recursive":
                RecursiveBacktracker().generateMaze(nodesArray, 0, 0);
                break;
            default:
                return;
        }
        /* eslint-enable */
    };

    const visualize = (algoType) => {
        if (!algoType || isVisualizing()) {
            return;
        }
        clearPath();

        const startNode = document.querySelector(".grid__node.start");
        const endNode = document.querySelector(".grid__node.end");
        const obj = {
            grid: nodesArray,
            sRow: +startNode.dataset.row,
            sCol: +startNode.dataset.col,
            eRow: +endNode.dataset.row,
            eCol: +endNode.dataset.col
        };

        setVisualizingState(true);

        /* eslint-disable */
        switch (algoType) {
            case "A*":
                AStarFinder().findPath(obj.grid, obj.sRow, obj.sCol, obj.eRow, obj.eCol);
                break;
            case "BFS":
                BreadthFirstFinder().findPath(obj.grid, obj.sRow, obj.sCol, obj.eRow, obj.eCol);
                break;
            case "DFS":
                DepthFirstFinder().findPath(obj.grid, obj.sRow, obj.sCol, obj.eRow, obj.eCol);
                break;
            default:
                return;
        }
        /* eslint-enable */
    };

    const populateGrid = (rows, columns) => {
        gridContainer.style.setProperty("--rows", rows);
        gridContainer.style.setProperty("--columns", columns);

        for (let i = 0; i < rows; i++) {
            nodesArray.push([]);

            for (let j = 0; j < columns; j++) {
                let node = Node().createNode();

                addNodeProperties(node, i, j);

                nodesArray[i].push(node);

                gridContainer.appendChild(node);
            }
        }

        [startRow, startCol] = [1, 1];
        [endRow, endCol] = [nodesArray.length - 2, nodesArray[0].length - 2];
        addStartandEndNodes(startRow, startCol, endRow, endCol);
    };

    const addNodeProperties = (node, row, col) => {
        node.dataset.row = row;
        node.dataset.col = col;

        node.addEventListener("mouseenter", () => {
            if (!drawState) return;

            toggleNode(node);
        });

        node.addEventListener("mousedown", () => {
            toggleNode(node);
        });
    };

    const toggleNode = (node) => {
        if (node.classList.contains("empty")) {
            node.className = wallClass;
        }
        else if (node.classList.contains("wall")) {
            node.className = emptyClass;
        }
    };

    const addStartandEndNodes = (sRow, sCol, eRow, eCol) => {
        let startNode = nodesArray[sRow][sCol];
        let endNode = nodesArray[eRow][eCol];

        startNode.className = startClass;
        startNode.draggable = true;
        endNode.className = endClass;
        endNode.draggable = true;

        handleDragAndDrop([startNode, endNode]);
    };

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
    };

    const clearGrid = () => {
        if (isVisualizing()) {
            return;
        }

        const allNodes = document.querySelectorAll(".grid__node");

        allNodes.forEach((node) => {
            if (node.classList.contains("start") || node.classList.contains("end")) {
                return;
            }

            switchNodeClassTo("empty", node);
        });
    };

    const clearPath = () => {
        if (isVisualizing()) {
            return;
        }

        const pathNodes = Array.from(document.querySelectorAll(".grid__node.path"));
        const visitedNodes = Array.from(document.querySelectorAll(".grid__node.visited"));

        [...pathNodes, ...visitedNodes].forEach((node) => {
            switchNodeClassTo("empty", node);
        });
    };

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
        clearGrid,
        clearPath,
        visualize,
        createMaze,
    };
};