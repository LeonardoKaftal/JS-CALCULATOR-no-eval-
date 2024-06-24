const buttons = document.querySelectorAll(".button-element-container");
const screen = document.querySelector(".display-container");
const ACButton = document.querySelector("#erase-all-sign")
const eraseButton = document.querySelector("#erase-button")
const equalButton = document.querySelector("#equal-button")

initialEventListeners()

function initialEventListeners() {
    // appen to the sceen
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const text = button.textContent || button.innerText;
            const textNode = document.createTextNode(text);
            screen.appendChild(textNode);
        });
    });
    // AC button
    ACButton.addEventListener("click", ()=> {
        screen.textContent = ""
    })

    //erase button
    eraseButton.addEventListener("click", () => {
        screen.textContent = screen.textContent.slice(0, -1);
    });

    // equal button
    equalButton.addEventListener("click", ()=> {
        parse()
    })
}

function parse() {
    console.log("Evaluating...")
    const screenContent = screen.textContent.split("")
    screenContent.forEach(member => {
        let result = 0;
        let globalIndex = 0
        switch (member) {
            case "+":
                result = handleSum(globalIndex);
                break;
            case "-": 
                result = handleSub(globalIndex);
                break;
            case "*":
                result = handleMultiplication(globalIndex);
                break;
            case "/":
                result = handleDivision(globalIndex);
                break
        }
    })
}





