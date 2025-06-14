//initialize variables to help with accurate calculations and display
let leftNum, rightNum, operator, result, multipleOperatorExists = false;
const display = document.querySelector(".display");

//operator functions
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b) {
    isFloat = true;
    return a / b;
}

//handle operate functions
function operate(operator, leftNum, rightNum) {
    let ans; 
    switch(operator){
        case '+': {
            ans = add(leftNum, rightNum);
            break;
        }
        case '-': {
            ans = subtract(leftNum, rightNum);
            break;
        }
        case '*': {
            ans = multiply(leftNum, rightNum);
            break;
        }
        case '/': {
            if (rightNum != 0) {
                ans = divide(leftNum, rightNum);
            } else {
                alert("Error: Division by zero");
                resetValues();
                ans = 0;
            }
        }
    }
    return ans;

}

//display text
function displayText(text){
    if (displayText.length <= 13) {
        display.textContent += text; 
    } else {
        display.textContent = Number.parseFloat(text).toExponential(3);
    }
} resetValues();

//clear display function
function clearDisplay() {
    display.textContent = '';
}

//clear values
function resetValues() {
    leftNum = 0;
    rightNum = 0;
    operator = undefined;
    isFloat = false; 
    multipleOperatorExists = false;
}

//get display result
function getResult(){
    rightNum = parseFloat(display.textContent);
    return parseFloat(operate(operator, leftNum, rightNum).toFixed(3));
}

//log function
function log(message){
    console.log(message);
}


const numericKeys = document.querySelectorAll("button.numeric"); 
numericKeys.forEach(button => {
    button.addEventListener('click', () => {
        //if display has 0 need to remove it
        if ( display.textContent == '0' || multipleOperatorExists) {
            clearDisplay();
            multipleOperatorExists = false;
        }
        //current width of disp can hold 13 digits max
        if (display.textContent.length < 13) {
            displayText(button.textContent); 
        }
    });
});

const operatorKeys = document.querySelectorAll("button.operatorKeys")
operatorKeys.forEach(button => {
    button.addEventListener('click', () => {
        //case 1 + 
        if (leftNum === undefined && operator === undefined && display.textContent !== '') {
            leftNum = parseFloat(display.textContent);
            operator = button.textContent;
            clearDisplay();
            //case 1 + 2 + 
        } else if (leftNum !== undefined && operator !== undefined && display.textContent != '' && !multipleOperatorExists) {
            multipleOperatorExists = true;
            result = getResult();
            clearDisplay(); 
            //display result 
            displayText(String(result));
            leftNum = result;
            operator = button.textContent;
        } else if (leftNum !== undefined && operator !== undefined && (parseFloat(display.textContent) == result || display.textContent == '')) {
                    //case operand operator 1 + -
                    operator = button.textContent;
        }
    });
});

const equalsKey = document.querySelector("#equals");
equalsKey.addEventListener('click', () => {
    
})