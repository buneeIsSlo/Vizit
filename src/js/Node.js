export const Node = () => {

    const createNode = () => {
        const node = document.createElement("button");

        node.classList.add("grid__node");
        node.classList.add("empty");

        return node;
    }

    return {
        posX,
        posY,
        createNode,
    }
}