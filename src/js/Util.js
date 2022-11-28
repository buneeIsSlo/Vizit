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