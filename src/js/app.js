import "../sass/main.scss";
import { grid } from "./grid";

console.log("ohaider");

const appGrid = grid();
const visualizeBtn = document.querySelector(".visualize");
const clearGridBtn = document.querySelector(".clear-grid");
const clearPathBtn = document.querySelector(".clear-path");

appGrid.renderGrid();
window.addEventListener("resize", () => appGrid.renderGrid());

clearGridBtn.addEventListener("click", () => {
    appGrid.clearGrid();
});
clearPathBtn.addEventListener("click", () => {
    appGrid.clearPath();
})

visualizeBtn.addEventListener("click", () => {
    console.log("vizzing");
    appGrid.visualize();
});