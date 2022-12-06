import { switchNodeClassTo, isStartOrEndNode } from "../Util";

export const RecursiveBacktracker = () => {

    const generateMaze = (grid, row, col) => {
        const visited = new Set();
        const stack = [];
        let [curRow, curCol] = [row, col];

        stack.push([curRow, curCol]);

        while (stack.length) {
            if (!isStartOrEndNode(grid[curRow][curCol]))
                switchNodeClassTo("wall", grid[curRow][curCol]);

            const randomNeighbourPos = getRandomNeighbourPos(grid, curRow, curCol, visited);

            if (randomNeighbourPos) {
                stack.push(randomNeighbourPos);

                const [nextRow, nextCol] = [randomNeighbourPos[0], randomNeighbourPos[1]];
                const x = curRow - nextRow;
                const y = curCol - nextCol;

                let pos = `${nextRow}, ${nextCol}`;
                visited.add(pos);

                let inBetweenNode;
                if (x === 0) {
                    if (y < 0) {
                        inBetweenNode = grid[curRow][curCol + 1];
                    }
                    else {
                        inBetweenNode = grid[curRow][curCol - 1];
                    }
                }
                else if (y === 0) {
                    if (x < 0) {
                        inBetweenNode = grid[curRow + 1][curCol];
                    }
                    else {
                        inBetweenNode = grid[curRow - 1][curCol];
                    }
                }

                if (!isStartOrEndNode(inBetweenNode))
                    switchNodeClassTo("wall", inBetweenNode);

                curRow = nextRow;
                curCol = nextCol;
            }
            else {
                [curRow, curCol] = stack.pop();
            }
        }
    }

    const getRandomNeighbourPos = (grid, row, col, visited) => {
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

            const pos = `${nRow}, ${nCol}`;
            if (visited.has(pos)) continue;

            validNeighbours.push([nRow, nCol]);
        }

        const randomNum = ~~(Math.random() * validNeighbours.length);
        return validNeighbours[randomNum];
    }

    return {
        generateMaze,
    }
}