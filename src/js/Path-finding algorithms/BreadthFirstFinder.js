export const BreadFirstFinder = () => {

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

                if (nRow < 0 || nCol < 0 || nRow >= grid.length || nCol >= grid[0].length) {
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

    const animateSearch = async (node) => {
        node.style.backgroundColor = "yellow";
        await addDelay(0.1);
        node.style.backgroundColor = "blue";
    }

    const addDelay = async (seconds) => {
        return new Promise((resolve) => {
            return setTimeout(resolve, seconds * 100);
        });
    }

    return {
        findPath,
    }
}