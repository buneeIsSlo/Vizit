import { switchNodeClassTo, setVisualizingState } from "../Util";

export const BreadthFirstFinder = () => {

    const findPath = async (grid, sRow, sCol, eRow, eCol) => {
        const queue = [[sRow, sCol]];
        const parentMap = new Map();
        parentMap.set(`${sRow}, ${sCol}`, [sRow, sCol]);
        console.log([grid, sRow, sCol, eRow, eCol, grid.length]);

        while (queue.length) {
            const [curRow, curCol] = queue.shift();
            const curNode = [curRow, curCol];
            console.log([curRow, curCol]);

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
                if (parentMap.has(key)) {
                    continue;
                }

                parentMap.set(key, [curRow, curCol]);
                queue.push([nRow, nCol]);
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