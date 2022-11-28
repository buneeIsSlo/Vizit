import { PriorityQueue, switchNodeClassTo, setVisualizingState } from "../Util";

export const AStarFinder = () => {

    const findPath = async (grid, sRow, sCol, eRow, eCol) => {
        const queue = new PriorityQueue;
        const gCostMap = new Map();
        const hCostMap = new Map();
        const parentMap = new Map();
        parentMap.set(`${sRow}, ${sCol}`, [sRow, sCol]);
        gCostMap.set(`${sRow}, ${sCol}`, 0);

        queue.enqueue([sRow, sCol], 0);

        while (!queue.isEmpty()) {
            const [curRow, curCol] = queue.dequeue().element;
            const curKey = `${curRow}, ${curCol}`;
            const curNode = [curRow, curCol];
            console.log(curKey);

            if (grid[curRow][curCol].classList.contains("wall")) {
                continue;
            }

            if (curRow === eRow && curCol === eCol) {
                console.log("yo, I got em!");
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
                const cost = gCostMap.get(curKey);
                if (parentMap.has(key) || cost > gCostMap.get(key)) {
                    continue;
                }

                parentMap.set(key, [curRow, curCol]);
                gCostMap.set(key, cost);

                // const distRow = Math.pow(eRow - nRow, 2);
                // const distCol = Math.pow(eCol - nCol, 2);
                const distRow = Math.abs(eRow - nRow);
                const distCol = Math.abs(eCol - nCol);
                const distance = distRow + distCol;
                const fCost = cost + distance;

                hCostMap.set(key, fCost);
                queue.enqueue([nRow, nCol], fCost);
            }

            await addDelay(0.05);
        }

        const path = getPath(parentMap, sRow, sCol, eRow, eCol);
        animatePath(grid, path);
    }

    const animateSearch = async (node) => {
        if (node.classList.contains("start") || node.classList.contains("end")) {
            return;
        }

        switchNodeClassTo("searching", node);
        await addDelay(0.1);
        switchNodeClassTo("visited", node);
    }

    const addDelay = async (seconds) => {
        return new Promise((resolve) => {
            return setTimeout(resolve, seconds * 100);
        });
    }

    const getPath = (map, sRow, sCol, eRow, eCol) => {
        const path = [];
        let curNodePos = [eRow, eCol];
        let curNodeKey = `${eRow}, ${eCol}`;
        let startKey = `${sRow}, ${sCol}`;

        while (startKey !== curNodeKey) {
            path.unshift(curNodePos);

            const tmpArr = map.get(curNodeKey);
            curNodePos = tmpArr;
            curNodeKey = `${tmpArr[0]}, ${tmpArr[1]}`;
        }

        return path;
    }

    const animatePath = async (grid, path) => {
        for (let arr of path) {
            const [row, col] = arr;
            const node = grid[row][col];

            if (node.classList.contains("start") || node.classList.contains("end")) {
                continue;
            }
            switchNodeClassTo("path", grid[row][col]);

            await addDelay(0.3);
        }

        setVisualizingState(false);
    }

    return {
        findPath,
    }
}