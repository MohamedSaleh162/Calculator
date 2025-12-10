const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");

let currentInput = "";
function adjustFontSize(text) {
  const length = text.length;

  if (length < 10) {
    screen.style.fontSize = "2.5rem";
  } else if (length < 15) {
    screen.style.fontSize = "1.8rem";
  } else {
    screen.style.fontSize = "1.2rem";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (value === "AC") {
      currentInput = "";
      screen.innerText = "0";
      adjustFontSize("0");
    } else if (value === "Del") {
      currentInput = currentInput.toString().slice(0, -1);
      const textToShow = currentInput === "" ? "0" : currentInput;
      screen.innerText = textToShow;
      adjustFontSize(textToShow);
    } else if (value === "=") {
      try {
        let calculation = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
        const result = eval(calculation).toString();
        screen.innerText = result;
        currentInput = result;
        adjustFontSize(result);
      } catch (error) {
        screen.innerText = "Error";
        currentInput = "";
        adjustFontSize("Error");
      }
    } else {
      if (currentInput === "" && value === "0") return;
      currentInput += value;
      screen.innerText = currentInput;
      adjustFontSize(currentInput);
    }
  });
});
