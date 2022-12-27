import { isStartOrEndNode, switchNodeClassTo, shuffleArray } from "../Util";

export const Prims = () => {

    const generateMaze = (grid, row, col) => {
        const allNodes = document.querySelectorAll(".grid__node");
        const visited = new Set();

        allNodes.forEach((node) => {
            if (isStartOrEndNode(node)) return;

            switchNodeClassTo("wall", node);
        });

        if (!isStartOrEndNode(grid[row][col]))
            switchNodeClassTo("empty", grid[row][col]);

        let frontierList = shuffleArray(getFrontierNodesPos(grid, row, col, visited));

        while (frontierList.length) {
            const [fRow, fCol] = frontierList.pop();
            const frontierNode = grid[fRow][fCol];

            const [eRow, eCol] = getRandomEmptyNeighbour(grid, fRow, fCol, visited);

            const x = fRow - eRow;
            const y = fCol - eCol;

            let inBetweenNode;
            if (x === 0) {
                if (y < 0) {
                    inBetweenNode = grid[fRow][fCol + 1];
                }
                else {
                    inBetweenNode = grid[fRow][fCol - 1];
                }
            }
            else if (y === 0) {
                if (x < 0) {
                    inBetweenNode = grid[fRow + 1][fCol];
                }
                else {
                    inBetweenNode = grid[fRow - 1][fCol];
                }
            }

            if (!isStartOrEndNode(inBetweenNode))
                switchNodeClassTo("empty", inBetweenNode);

            if (!isStartOrEndNode(frontierNode))
                switchNodeClassTo("empty", frontierNode);

            frontierList.push(...shuffleArray(getFrontierNodesPos(grid, fRow, fCol, visited)));
        }
    };

    const getFrontierNodesPos = (grid, row, col, visited) => {
        const neighbourNodes = [
            { row: row - 2, col: col },
            { row: row + 2, col: col },
            { row: row, col: col - 2 },
            { row: row, col: col + 2 },
        ];
        const frontierNodes = [];

        for (let neighbour of neighbourNodes) {
            const [nRow, nCol] = [neighbour.row, neighbour.col];

            if (nRow < 0 || nCol < 0 || nRow >= grid.length || nCol >= grid[0].length) continue;
            if (grid[nRow][nCol].classList.contains("empty")) continue;

            const pos = `${nRow}, ${nCol}`;
            if (visited.has(pos)) continue;
            visited.add(pos);

            frontierNodes.push([nRow, nCol]);
        }

        return frontierNodes;
    };

    const getRandomEmptyNeighbour = (grid, row, col) => {
        const neighbourNodes = [
            { row: row - 2, col: col },
            { row: row + 2, col: col },
            { row: row, col: col - 2 },
            { row: row, col: col + 2 },
        ];
        const validNeighbours = [];

        for (let neighbour of neighbourNodes) {
            const [nRow, nCol] = [neighbour.row, neighbour.col];

            if (nRow < 0 || nCol < 0 || nRow >= grid.length || nCol >= grid[0].length) continue;
            if (grid[nRow][nCol].classList.contains("wall")) continue;

            validNeighbours.push([nRow, nCol]);
        }

        const randomNum = ~~(Math.random() * validNeighbours.length);
        return validNeighbours[randomNum];
    };

    return {
        generateMaze,
    };
};