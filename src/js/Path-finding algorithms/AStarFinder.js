import { PriorityQueue, addDelay, animateSearch, getPath, animatePath } from "../Util";

export const AStarFinder = () => {

    const findPath = async (grid, sRow, sCol, eRow, eCol) => {
        const queue = new PriorityQueue;
        const gCostMap = new Map();
        const parentMap = new Map();
        parentMap.set(`${sRow}, ${sCol}`, [sRow, sCol]);
        gCostMap.set(`${sRow}, ${sCol}`, 0);

        queue.enqueue([sRow, sCol], 0);

        while (!queue.isEmpty()) {
            const [curRow, curCol] = queue.dequeue().element;
            const curKey = `${curRow}, ${curCol}`;

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
                const gCost = gCostMap.get(curKey) + ((nRow - sRow === 0 || nCol - sCol === 0) ? 1 : Math.SQRT2);

                if (!parentMap.has(key) || gCost < gCostMap.get(key)) {
                    parentMap.set(key, [curRow, curCol]);
                    gCostMap.set(key, gCost);

                    const rowDistance = Math.abs(eRow - nRow);
                    const colDistance = Math.abs(eCol - nCol);
                    const hCost = rowDistance + colDistance;
                    const fCost = gCost + hCost;

                    queue.enqueue([nRow, nCol], fCost);
                }
            }

            await addDelay(0.05);
        }

    }

    return {
        findPath,
    }
}