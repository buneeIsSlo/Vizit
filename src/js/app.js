import "../sass/main.scss";
import { grid } from "./grid";

console.log("ohaider");

const appGrid = grid();

appGrid.renderGrid();
window.addEventListener("resize", () => appGrid.renderGrid());