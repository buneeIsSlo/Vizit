import "../sass/main.scss";
import { Grid } from "./Grid";

console.log("ohaider");

const visualizeBtn = document.querySelector(".visualize");
const clearGridBtn = document.querySelector(".clear-grid");
const clearPathBtn = document.querySelector(".clear-path");
const dropdowns = document.querySelectorAll(".dropdown");
const openControlsBtn = document.querySelector(".toggle-menu");
const controlsMenu = document.querySelector(".menu");

const appGrid = Grid();
setUpGrid();
handleControls();

function setUpGrid() {
    appGrid.renderGrid();

    const resizeObserver = new ResizeObserver(() => {
        appGrid.renderGrid();
    });
    resizeObserver.observe(document.body);
}

function handleControls() {
    // Only for mobile/touch screens
    toggleControls();

    // Dropdowns
    dropdowns.forEach((dropdown) => {
        handleDropdown(dropdown);
    });

    // Secondary buttons
    clearGridBtn.addEventListener("click", (event) => {
        createRipple(clearGridBtn, event);
        appGrid.clearGrid();
    });
    clearPathBtn.addEventListener("click", (event) => {
        createRipple(clearPathBtn, event);
        appGrid.clearPath();
    });

    // Visuailze button
    visualizeBtn.addEventListener("click", () => {
        const algoType = visualizeBtn.dataset.algoType;

        if (!algoType) return;

        appGrid.visualize(algoType);
    });
}

function toggleControls() {
    openControlsBtn.addEventListener("click", () => {
        const chevron = document.querySelector(".toggle-menu__chevron");
        const btnText = document.querySelector(".toggle-menu__text");

        chevron.classList.toggle("rotate-up");
        controlsMenu.classList.toggle("open");

        if (controlsMenu.classList.contains("open")) {
            btnText.innerText = "Close controls";
        }
        else {
            btnText.innerText = "Open controls";
        }
    });
}

function handleDropdown(dropdown) {
    const dropdownType = dropdown.dataset.dropdownType;
    const dropdownBtn = dropdown.querySelector(".dropdown__button");
    const dropdownChevron = dropdown.querySelector(".dropdown__chevron");
    const dropdownTitle = dropdownBtn.querySelector(".dropdown__button-text");
    const dropdownMenu = dropdown.querySelector(".dropdown__menu");
    const menuOptions = dropdownMenu.querySelectorAll(".option");

    dropdownBtn.addEventListener("click", (event) => {
        createRipple(dropdownBtn, event);
        dropdownChevron.classList.toggle("rotate-up");
        dropdownMenu.classList.toggle("open");
    });

    menuOptions.forEach((option) => {
        option.addEventListener("click", () => {
            if (dropdownType === "finders") {
                dropdownTitle.innerText = option.innerText;
                visualizeBtn.dataset.algoType = option.dataset.algo;
            }
            if (dropdownType === "mazers") {
                appGrid.createMaze(option.dataset.algo);
            }

            dropdownMenu.classList.remove("open");
            dropdownChevron.classList.toggle("rotate-up");
        });
    });
}

function createRipple(btn, event) {
    const circle = document.createElement("span");
    const btnRect = btn.getBoundingClientRect();
    const diameter = Math.max(btnRect.width, btnRect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btnRect.left + radius)}px`;
    circle.style.top = `${event.clientY - (btnRect.top + radius)}px`;
    circle.className = "ripple";

    const ripple = btn.querySelector(".ripple");
    if (ripple)
        ripple.remove();

    btn.appendChild(circle);
}