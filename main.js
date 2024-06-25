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
    handleParenthesis(screenContent)
}

function handleParenthesis(screenContent) {
    let result = 0
    lastParenthesisIndex = 0

    // hadle Multiplication and division
    for (let i = screenContent.length - 1; i > 0; i--) {
        if (screenContent[i] === "(") {
            tempLastParenthesisIndex = i
            lastParenthesisIndex = i
            // multiplication and division
            while (screenContent[tempLastParenthesisIndex] !== ")") {
                tempLastParenthesisIndex++
                if (screenContent[tempLastParenthesisIndex] === "*") {
                    tempLastParenthesisIndex = handleCalculation(screenContent, tempLastParenthesisIndex)
                }
                else if (screenContent[tempLastParenthesisIndex] === "/") {
                    tempLastParenthesisIndex = handleCalculation(screenContent, tempLastParenthesisIndex)
                }
            }
            // addition and subtraction
            tempLastParenthesisIndex = i
            while (screenContent[tempLastParenthesisIndex] !== ")") {
                tempLastParenthesisIndex++
                if (screenContent[tempLastParenthesisIndex] === "+") {
                    tempLastParenthesisIndex = handleCalculation(screenContent, tempLastParenthesisIndex)
                }
                else if (screenContent[tempLastParenthesisIndex] === "-") {
                    tempLastParenthesisIndex = handleCalculation(screenContent, tempLastParenthesisIndex)
                }
            }
            screenContent.splice(lastParenthesisIndex, 1)
            screenContent.splice(lastParenthesisIndex + 1, 1)
            screen.textContent = screenContent.join("")
        }
    }
}


function handleCalculation(screenContent, operatorIndex) {
    const nums1 = [];
    const nums2 = [];
    const operator = screenContent[operatorIndex];
    console.log(screenContent.splice(operatorIndex,1))
    let negativeIndex = operatorIndex - 1;

    // backwards
    while (negativeIndex >= 0 && !isNaN(screenContent[negativeIndex])) {
        console.log("aggiunti " + screenContent[negativeIndex])
        nums1.unshift(screenContent[negativeIndex]);
        screenContent.splice(negativeIndex, 1)
        negativeIndex--;
    }

    let positiveOperatorIndex = negativeIndex + 1
    console.log(screenContent[positiveOperatorIndex])

    // upwards
    while (positiveOperatorIndex < screenContent.length && !isNaN(screenContent[positiveOperatorIndex])) {
        nums2.push(screenContent[positiveOperatorIndex]);
        screenContent.splice(positiveOperatorIndex, 1)
    }


    let result;
    switch (operator) {
        case "+":
            result = parseFloat(nums1.join('')) + parseFloat(nums2.join(''));
            break;
        case "-":
            result = parseFloat(nums1.join('')) - parseFloat(nums2.join(''));
            break;
        case "*":
            result = parseFloat(nums1.join('')) * parseFloat(nums2.join(''));
            break;
        case "/":
            result = parseFloat(nums1.join('')) / parseFloat(nums2.join(''));
            break;
    }


    screenContent.splice(negativeIndex + 1,0, result)
    screen.textContent = screenContent.join("")
    return negativeIndex + 1
}





