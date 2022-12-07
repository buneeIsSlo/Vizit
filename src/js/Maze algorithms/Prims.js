import { isStartOrEndNode, switchNodeClassTo } from "../Util"

export const Prims = () => {

    const generateMaze = (grid, row, col) => {
        const allNodes = document.querySelectorAll(".grid__node");
        allNodes.forEach((node) => {
            if (isStartOrEndNode(node)) return;

            switchNodeClassTo("wall", node);
        });

        const visited = new Set();
        let [curRow, curCol] = [row, col];
        switchNodeClassTo("empty", grid[curRow][curCol]);

        let frontierList = shuffle(getFrontierNodes(grid, curRow, curCol));

        while (frontierList.length) {
            const [fRow, fCol] = frontierList.pop();
            const frontierNode = grid[fRow][fCol];

            let pos = `${fRow}, ${fCol}`
            if (visited.has(pos)) continue;
            visited.add(pos);

            const [eRow, eCol] = getRandomEmptyNeighbour(grid, fRow, fCol, visited);

            const x = fRow - eRow;
            const y = fCol - eCol;

            console.log(x, y);

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

            switchNodeClassTo("empty", inBetweenNode);
            switchNodeClassTo("empty", frontierNode);



            frontierList = shuffle(getFrontierNodes(grid, fRow, fCol));
        }

    }

    const getFrontierNodes = (grid, row, col) => {
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

            frontierNodes.push([nRow, nCol]);
        }

        return frontierNodes;
    }

    const getRandomEmptyNeighbour = (grid, row, col, visited) => {
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

            // const pos = `${nRow}, ${nCol}`;
            // if (visited.has(pos)) continue;

            validNeighbours.push([nRow, nCol]);
        }

        const randomNum = ~~(Math.random() * validNeighbours.length);
        return validNeighbours[randomNum];
    }

    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    return {
        generateMaze,
    }
}