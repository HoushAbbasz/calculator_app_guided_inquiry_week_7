"use strict";

// set inDarkMode to false and get the display element
let inDarkMode = false;
const display = document.getElementById("display");

// add an event handler for all of the buttons 
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;

        if (value === "C") {
            display.value = "";
            return;
        }

        if (value === "Dark Mode" || value === "Light Mode") {
            toggleDarkMode();
            return; 
        }

        /*  use the math.derivative function to get the derivative 
        with respect to n and display it*/ 
        if (btn.classList.contains("submission")) {
            try {
                const expr = display.value;
                const derivative = math.derivative(expr, "n").toString();
                display.value = derivative;
            } catch (err) {
                display.value = "Error";
            }
            return;
        }

        let input = value;

        if (value === "÷") input = "/";
        if (value === "x") input = "*";
        if (value === "exp (^)") input = "^";
        if (value === "sin") input = "sin(";
        if (value === "cos") input = "cos(";

        display.value += input;
    });
});

/* sets inDarkMode to the opposite state */ 
function toggleDarkMode() {
    inDarkMode = !inDarkMode;

    document.body.classList.toggle("dark");

    const darkBtn = document.querySelector('.dark-toggle');
    darkBtn.textContent = inDarkMode ? 'Light Mode' : 'Dark Mode';
}

// activates nav whenever it's clicked 
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("active");
});
