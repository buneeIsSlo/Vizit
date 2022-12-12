import Toastify from 'toastify-js';


export const switchNodeClassTo = (customClass, node) => {
    node.className = "grid__node";
    node.classList.add(customClass);
}


const gridContainer = document.querySelector(".app__grid");
export const isVisualizing = () => {
    return gridContainer.dataset.visualizing == "true";
}
export const setVisualizingState = (bool) => {
    gridContainer.dataset.visualizing = bool;
}


export const addDelay = async (seconds) => {
    return new Promise((resolve) => {
        return setTimeout(resolve, seconds * 100);
    });
}


export const animateSearch = async (node) => {
    if (node.classList.contains("start") || node.classList.contains("end")) {
        return;
    }

    switchNodeClassTo("searching", node);
    await addDelay(1);
    switchNodeClassTo("visited", node);
}


export const getPath = (map, sRow, sCol, eRow, eCol) => {
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


export const animatePath = async (grid, path) => {
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


export const isStartOrEndNode = (node) => {
    return node.classList.contains("start") || node.classList.contains("end");
}


export const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);


class QueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

export class PriorityQueue {
    constructor() {
        this.items = []
    }

    enqueue(element, priority) {
        let queueElement = new QueueElement(element, priority)

        let added = false
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement)
                added = true
                break
            }
        }

        if (!added) {
            this.items.push(queueElement)
        }
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length == 0
    }

    contains(element) {
        return !!this.items.find(item => item.element === element)
    }
}


export const showErrorToast = () => {
    Toastify({
        text: "Sorry, path could not be found",
        duration: 2000,
        close: true,
        gravity: "bottom",
        position: "right",
        className: "toast toast__error",
        stopOnFocus: true,
    }).showToast();
}