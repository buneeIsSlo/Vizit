export const switchNodeClassTo = (customClass, node) => {
    node.className = "grid__node";
    node.classList.add(customClass);
}