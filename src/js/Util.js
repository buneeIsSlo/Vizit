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