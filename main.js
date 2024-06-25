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
    let screenContent = screen.textContent;
    
    // Check for unclosed parentheses
    if (screenContent.split('(').length !== screenContent.split(')').length) {
        alert("Error: unclosed parenthesis");
        return;
    }
    
    // Check for incomplete operations
    if (/[\+\-\*\/]$/.test(screenContent)) {
        alert("Error: incomplete operation");
        return;
    }

    // Check for division by zero
    if (/\/0/.test(screenContent)) {
        alert("Error: division by zero");
        return;
    }


    screenContent = screen.textContent.split("")
    screenContent = handleParenthesis(screenContent)

    // normal calculation
    for (let i = 0; i < screenContent.length; i++) {
        const element = screenContent[i]
        if (element === "*" || element === "/") {
            i = handleCalculation(screenContent, i)
        }
    }

    screenContent = screen.textContent.split("")

    for (let i = 0; i < screenContent.length; i++) {
        const element = screenContent[i]
        if (element === "+" || element === "-") {
            i = handleCalculation(screenContent, i)
        }
    }
}

function handleParenthesis(screenContent) {
    lastParenthesisIndex = 0

    // hadle Multiplication and division
    for (let i = screenContent.length - 1; i > 0; i--) {
        if (screenContent[i] === "(") {
            tempLastParenthesisIndex = i
            lastParenthesisIndex = i

            // multiplication and division
            while (screenContent[tempLastParenthesisIndex] !== ")") {
                tempLastParenthesisIndex++
                if (screenContent[tempLastParenthesisIndex] === "*" || screenContent[tempLastParenthesisIndex] === "/") {
                    tempLastParenthesisIndex = handleCalculation(screenContent, tempLastParenthesisIndex)
                }
            }

            // addition and subtraction
            tempLastParenthesisIndex = i
            while (screenContent[tempLastParenthesisIndex] !== ")") {
                tempLastParenthesisIndex++
                if (screenContent[tempLastParenthesisIndex] === "+" || screenContent[tempLastParenthesisIndex] === "-") {
                    tempLastParenthesisIndex = handleCalculation(screenContent, tempLastParenthesisIndex)
                }
                
            }
            
            screenContent.splice(lastParenthesisIndex, 1)
            screenContent.splice(lastParenthesisIndex + 1, 1)
        }

    }
    return screenContent            

}


function handleCalculation(screenContent, operatorIndex) {
    const nums1 = [];
    const nums2 = [];
    const operator = screenContent[operatorIndex];
    console.log(screenContent.splice(operatorIndex,1))
    let negativeIndex = operatorIndex - 1;

    // backwards
    while (negativeIndex >= 0 && !isNaN(screenContent[negativeIndex]) || screenContent[negativeIndex] === ".") {
        nums1.unshift(screenContent[negativeIndex]);
        screenContent.splice(negativeIndex, 1)
        negativeIndex--;
    }

    let positiveOperatorIndex = negativeIndex + 1

    // upwards
    while (positiveOperatorIndex < screenContent.length && !isNaN(screenContent[positiveOperatorIndex]) || screenContent[positiveOperatorIndex] === ".") {
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





