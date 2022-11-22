import "../sass/main.scss";
import { grid } from "./grid";

console.log("ohaider");

const appGrid = grid();
const visualizeBtn = document.querySelector(".visualize");

appGrid.renderGrid();
window.addEventListener("resize", () => appGrid.renderGrid());

visualizeBtn.addEventListener("click", () => {
    console.log("vizzing");
    appGrid.visualize();
});