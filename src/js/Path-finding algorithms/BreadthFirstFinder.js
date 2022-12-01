import { addDelay, animateSearch, getPath, animatePath } from "../Util";

export const BreadthFirstFinder = () => {

    const findPath = async (grid, sRow, sCol, eRow, eCol) => {
        const queue = [[sRow, sCol]];
        const parentMap = new Map();
        parentMap.set(`${sRow}, ${sCol}`, [sRow, sCol]);

        while (queue.length) {
            const [curRow, curCol] = queue.shift();

            if (grid[curRow][curCol].classList.contains("wall")) {
                continue;
            }

            if (curRow === eRow && curCol === eCol) {
                const path = getPath(parentMap, sRow, sCol, eRow, eCol);

                animatePath(grid, path);
                break;
            }

            animateSearch(grid[curRow][curCol]);

            const neighbourNodes = [
                { row: curRow - 1, col: curCol },
                { row: curRow + 1, col: curCol },
                { row: curRow, col: curCol - 1 },
                { row: curRow, col: curCol + 1 },
            ];

            for (let neighbour of neighbourNodes) {
                const [nRow, nCol] = [neighbour.row, neighbour.col];

                if (nRow < 0 || nCol < 0 || nRow > grid.length - 1 || nCol > grid[0].length - 1) {
                    continue;
                }

                const key = `${nRow}, ${nCol}`;
                if (parentMap.has(key)) {
                    continue;
                }

                parentMap.set(key, [curRow, curCol]);
                queue.push([nRow, nCol]);
            }

            await addDelay(0.05);
        }

    }

    return {
        findPath,
    }
}