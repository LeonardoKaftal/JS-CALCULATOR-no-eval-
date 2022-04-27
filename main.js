// calculator screen
const calculatorDisplay = document.querySelector(".display-container")
// numbers
const zero = document.querySelector("#zero")
const one = document.querySelector("#one")
const two = document.querySelector("#two")
const three = document.querySelector("#three")
const four = document.querySelector("#four")
const five = document.querySelector("#five")
const six = document.querySelector("#six")
const seven = document.querySelector("#seven")
const height = document.querySelector("#height")
const nine = document.querySelector("#nine")
// operator
const openParenthesis = document.querySelector("#opened-parenthesis")
const closedParenthesis = document.querySelector("#closed-parenthesis")
const eraseAll = document.querySelector("#erase-all-sign")
const eraseButton = document.querySelector("#erase-button")
const divideButton = document.querySelector("#split-operator")
const multiplicationButton = document.querySelector("#multiplication-operator")
const lessButton = document.querySelector("#less-operator")
const plusButton = document.querySelector("#plus-operator")
const decimalButton = document.querySelector("#decimal-operator")
const equalButton = document.querySelector("#equal-button")


// calculator array
let calculatorArray;
let calculatorDomArray = [];
// other variable 
let tempSpan
let counter
let parenthesisCounter
let finalParenthesis
let toLoop = false
// this variable is used to save how many time the user click a number before an operator, that's for the purpose of blocking the user to make numbers larger than 15 digits
let characterCounter = 0;
let tempcharacterCounter

eventFunction()


function eventFunction() {
    // append function

    function appendNumber(number) {
        // create span container function
        tempSpan = document.createElement('span');
        tempSpan.classList.add('colored-text');
        tempSpan.textContent = number;
        calculatorDomArray.push(tempSpan)
        calculatorDisplay.append(tempSpan);
    }

    // number event listener
    one.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(1)
        }

    })
    two.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(2)
        }
    })
    three.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(3)
        }
    })
    four.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(4)
        }
    })
    five.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(5)
        }
    })
    six.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(6)
        }
    })
    seven.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(7)
        }
    })
    height.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(8)
        }
    })
    nine.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(9)
        }
    })
    zero.addEventListener("click", () => {
        if (characterCounter < 16) {
            characterCounter++
            appendNumber(0)
        }
    })
    // operator event listener 
    decimalButton.addEventListener("click", () => {
        characterCounter++
        appendNumber(".")
    })
    plusButton.addEventListener("click", () => {
        tempcharacterCounter = characterCounter
        characterCounter = 0
        appendNumber("+")
    })
    lessButton.addEventListener("click", () => {
        tempcharacterCounter = characterCounter
        characterCounter = 0
        appendNumber("-")
    })
    multiplicationButton.addEventListener("click", () => {
        tempcharacterCounter = characterCounter
        characterCounter = 0
        appendNumber("*")
    })
    divideButton.addEventListener("click", () => {
        tempcharacterCounter = characterCounter
        characterCounter = 0
        appendNumber("/")
    })
    openParenthesis.addEventListener("click", () => {
        tempcharacterCounter = characterCounter
        characterCounter = 0
        appendNumber("(")
    })
    closedParenthesis.addEventListener("click", () => {
        tempcharacterCounter = characterCounter
        characterCounter = 0
        appendNumber(")")
    })


    eraseButton.addEventListener("click", () => {
        calculatorDisplay.textContent = ""
        calculatorDomArray.pop()
        tempSpan = document.createElement('span');
        tempSpan.classList.add('colored-text');

        for (let i = 0; i < calculatorDomArray.length; i++) {
            tempSpan.append(calculatorDomArray[i].textContent)
            calculatorDisplay.append(tempSpan)
        }
        characterCounter--
        if (characterCounter < 0) {
            characterCounter = tempcharacterCounter
        }
    })
    eraseAll.addEventListener("click", () => {
        calculatorDisplay.textContent = ""
        calculatorDomArray = []
        characterCounter = 0
    })



    equalButton.addEventListener("click", () => {
        // all the calculator used function
        let openParenthesisSign = 0
        let openParenthesisCounter = 0 
        let closedParenthesisCounter = 0
        calculatorArray = calculatorDisplay.textContent.split("")
        uniteCharacter()
        parseCalculatorArray()
        while(calculatorArray.includes("(" || calculatorArray(")"))) {
            solveMultiplicationAndDivisionInParenthesis()
            solveAdditionsAndSubtractionInParenthesis()

            // crash preventing
            if (calculatorArray.includes(NaN)) {
                preventCrash()
                break
            }

            for (let i = 0; i < calculatorArray.length; i++) {
                if (calculatorArray[i] === "(") {
                    openParenthesisCounter++
                    openParenthesisSign = i
                }
                if (calculatorArray[i] === ")") {
                    closedParenthesisCounter++
                }
            }
            // count how many pharenthesis he user has inserted 
            if (openParenthesisCounter !== closedParenthesisCounter) {
                preventCrash()
                break
            }
            else if (openParenthesisCounter === closedParenthesisCounter && calculatorArray[openParenthesisSign + 1] === ")") {
                preventCrash()
                break
            }
            
        } 
        
        while(calculatorArray.includes("*") || calculatorArray.includes("/") || calculatorArray.includes("+") || calculatorArray.includes("-") || calculatorArray.some(x => x < 0) && calculatorArray.length !== 1) {
            solveMultiplicationAndDivision()
            solveAdditionsAndSubtraction()
        }
        appendResult()


        // calculator logic
        // function used to unite into number all the string 
        function uniteCharacter() {
            let counter = 0
            while (calculatorArray[counter + 1] !== undefined) {
                try {
                    if (isNaN(parseFloat(calculatorArray[counter])) && calculatorArray[counter] !== "-") {
                        counter++
                    }
                    else if (isNaN(parseFloat(calculatorArray[counter])) === false || calculatorArray[counter] === "-") {
                        if (isNaN(parseFloat(calculatorArray[counter + 1])) === false || calculatorArray[counter + 1] === ".") {
                            let numberCounter = counter
                            while (isNaN(parseFloat(calculatorArray[numberCounter + 1])) === false || calculatorArray[counter + 1] === ".") {
                                calculatorArray[numberCounter] += calculatorArray[numberCounter + 1]
                                calculatorArray.splice(numberCounter + 1, 1)
                            }
                        }
                        else {
                            counter++
                        }
                    }

                } catch (e) {
                    counter--
                    break
                }
            }
            console.log(calculatorArray)
            calculatorArray[calculatorArray.length - 1] = calculatorArray[calculatorArray.length - 1].replaceAll('undefined', '')
        }
        // function to parse all the string into number
        function parseCalculatorArray() {
            for (let i = 0; i < calculatorArray.length; i++) {
                if (isNaN(parseFloat(calculatorArray[i])) === false) {
                    calculatorArray[i] = parseFloat(calculatorArray[i])
                }
            }
        }
    })

    // function used to prevent the browser from crashing when the user insert something wrong 
    function preventCrash() {
        alert("You have insert something wrong, pls retry")
        alert("Remember that you have to insert every operator and number in the correct aritmethical order for example don't do something like 33(22+44)")
                
    }
    // function used to solve first all the multiplicatio in parenthesis
    function solveMultiplicationAndDivisionInParenthesis() {
        do {
            for (let j = calculatorArray.length; j > 0; j--) {
                if (calculatorArray[j] === ")") {
                    finalParenthesis = j
                }
            }
            for (let i = 0; i < calculatorArray.length; i++) {
                if (calculatorArray[i] === "(" && i < finalParenthesis) {
                    parenthesisCounter = i
                    counter = parenthesisCounter + 1
                }
            }
            for (let i = parenthesisCounter; i < finalParenthesis; i++) {
                if (calculatorArray[i] === "*" || calculatorArray[i] === "/") {
                    toLoop = true
                    break
                }
                else {
                    toLoop = false
                }
            }

            while (counter < finalParenthesis) {
                counter++
                // iterate trought the parenthesis
                for (let operatorChecker = parenthesisCounter + 1; operatorChecker < finalParenthesis; operatorChecker++) {
                    multiplyDivide(operatorChecker) 
                }
            }
        } while (toLoop === true && calculatorArray.includes("(") && calculatorArray.includes(")"))
    }
    

function multiplyDivide(operatorChecker) {
    // check if the number is negative
    while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "*" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
        calculatorArray[operatorChecker - 1] *= calculatorArray[operatorChecker + 1]
        calculatorArray.splice(operatorChecker, 2)
    }
    while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "/" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
        calculatorArray[operatorChecker - 1] /= calculatorArray[operatorChecker + 1]
        calculatorArray.splice(operatorChecker, 2)
    }
    while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "*" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
        calculatorArray[operatorChecker - 1] *= calculatorArray[operatorChecker + 1]
        calculatorArray.splice(operatorChecker, 2)
    }
    for (let i = 0; i < calculatorArray.length; i++) {
        if (calculatorArray[i - 1] === "(" && isNaN(parseFloat(calculatorArray[i])) === false && calculatorArray[i + 1] === ")") {
            calculatorArray.splice(i - 1, 1)
            i--
            calculatorArray.splice(i + 1, 1)
            i--
        }
    }
}

// function used to add and subtract in pharenthesis
    function solveAdditionsAndSubtractionInParenthesis() {
        do {
            for (let j = calculatorArray.length; j > 0; j--) {
                if (calculatorArray[j] === ")") {
                    finalParenthesis = j
                }
            }
            for (let i = 0; i < calculatorArray.length; i++) {
                if (calculatorArray[i] === "(" && i < finalParenthesis) {
                    parenthesisCounter = i
                    counter = parenthesisCounter + 1
                }
            }
            for (let i = parenthesisCounter; i < finalParenthesis; i++) {
                if (calculatorArray[i] === "+" || calculatorArray[i] === "-") {
                    toLoop = true
                    break
                }
                else {
                    toLoop = false
                }
            }
            
            
            while (counter < finalParenthesis) {
                counter++
                // iterate trought the pharenthesis
                for (let operatorChecker = parenthesisCounter + 1; operatorChecker < finalParenthesis; operatorChecker++) {
                    sumSubtract(operatorChecker)                
                }
            }
        } while (toLoop === true && calculatorArray.includes("(") && calculatorArray.includes(")"))
    }

    function sumSubtract(operatorChecker) {
        while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] < 0 && calculatorArray[operatorChecker - 1] !== "(" && calculatorArray.includes("(")) {
            calculatorArray[operatorChecker - 1] += calculatorArray[operatorChecker]
            calculatorArray.splice(operatorChecker, 1)
        }
        while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "+" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
            calculatorArray[operatorChecker - 1] += calculatorArray[operatorChecker + 1]
            calculatorArray.splice(operatorChecker, 2)
        }
        while (calculatorArray[operatorChecker - 1] !== ")" && calculatorArray[operatorChecker] === "-" && calculatorArray[operatorChecker + 1] !== "(" && calculatorArray.includes("(")) {
            calculatorArray[operatorChecker - 1] -= calculatorArray[operatorChecker + 1]
            calculatorArray.splice(operatorChecker, 2)
        }
        // check if there is a negative number 
        

        for (let i = 0; i < calculatorArray.length; i++) {
            if (calculatorArray[i - 1] === "(" && isNaN(parseFloat(calculatorArray[i])) === false && calculatorArray[i + 1] === ")") {
                calculatorArray.splice(i - 1, 1)
                i--
                calculatorArray.splice(i + 1, 1)
                i--
                finalParenthesis = parenthesisCounter
                toLoop = false
            }
        }        
} 

// solve multiplication and division that are outside of the parenthesis

function solveMultiplicationAndDivision() {
        for (let i = 0; i < calculatorArray.length; i++) {
            
            if (calculatorArray[i] === "*") {
                calculatorArray[i - 1] *= calculatorArray[i + 1]
                calculatorArray.splice(i,2)
            }
            if (calculatorArray[i] === "/") {
                calculatorArray[i - 1] /= calculatorArray[i + 1]
                calculatorArray.splice(i,2)
            }
            if (i === calculatorArray.length - 1 && calculatorArray.includes("*") || calculatorArray.includes("/")) {
                i = 0
            }
        }
}

// solve addition and subtraction that are outside of the parenthesis

function solveAdditionsAndSubtraction() {
    for (let i = 0; i < calculatorArray.length; i++) {
        if (calculatorArray[i] === "+") {
            calculatorArray[i - 1] += calculatorArray[i + 1]
            calculatorArray.splice(i,2)
        }
        if (calculatorArray[i - 1] !== undefined && calculatorArray[i] < 0) {
            calculatorArray[i - 1] += calculatorArray[i]
            calculatorArray.splice(i,1)
        }
    }
}         
    function appendResult() {
        calculatorDisplay.textContent = ""
        calculatorDomArray = []
        let tempSpan = document.createElement("span")
        tempSpan.append(calculatorArray[0])
        tempSpan.classList.add('colored-text')
        calculatorDisplay.append(tempSpan)
    }
    // end of the function
}
