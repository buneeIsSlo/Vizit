import "../sass/main.scss";
import { grid } from "./grid";

console.log("ohaider");

const appGrid = grid();
const visualizeBtn = document.querySelector(".visualize");
const clearGridBtn = document.querySelector(".clear-grid");
const clearPathBtn = document.querySelector(".clear-path");
const dropdowns = document.querySelectorAll(".dropdown");

appGrid.renderGrid();
window.addEventListener("resize", () => appGrid.renderGrid());

clearGridBtn.addEventListener("click", () => {
    appGrid.clearGrid();
});
clearPathBtn.addEventListener("click", () => {
    appGrid.clearPath();
})

visualizeBtn.addEventListener("click", () => {
    const algoType = visualizeBtn.dataset.algoType;

    if (!algoType) return;

    console.log("vizzing");
    appGrid.visualize(algoType);
});

const handleDropdown = (dropdown) => {
    const dropdownBtn = dropdown.querySelector(".dropdown__button");
    const dropdownTitle = dropdownBtn.querySelector(".dropdown__button-text");
    const dropdownMenu = dropdown.querySelector(".dropdown__menu");
    const menuOptions = dropdownMenu.querySelectorAll(".option");

    dropdownBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("open");

        menuOptions.forEach((option) => {
            option.addEventListener("click", () => {
                visualizeBtn.dataset.algoType = option.dataset.algo;

                dropdownMenu.classList.remove("open");
                dropdownTitle.innerText = option.innerText;
            });
        });
    });
};

dropdowns.forEach((dropdown) => {
    handleDropdown(dropdown);
});