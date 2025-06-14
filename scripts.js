const display = document.querySelector(".display");
console.log("Display element:", display);
display.textContent = "123"; // Should show up immediately in the UI

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
    if (display.textContent.length <= 13) {
        display.textContent += text; 
    } else {
        display.textContent = Number.parseFloat(text).toExponential(3);
    }
} 

//clear display function
function clearDisplay() {
    display.textContent = '';
}

//clear values
function resetValues() {
    leftNum = undefined;
    rightNum = undefined;
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


let leftNum = undefined, rightNum = undefined, operator = undefined, result = undefined, multipleOperatorExists = false;


const numericKeys = document.querySelectorAll("button.numericKeys"); 
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

const operatorKeys = document.querySelectorAll("button.operatorKeys");
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
    if (leftNum !== undefined && operator !== undefined && display.textContent != ''){
        result = getResult();
        clearDisplay(); 
        displayText(String(result));
        resetValues();
    }
});

const clearKey = document.querySelector("#clear");
clearKey.addEventListener('click', () => {
    clearDisplay();
    resetValues();
});

const decimalKey = document.querySelector("#decimal");
decimalKey.addEventListener('click', () => {
    if (!display.textContent.includes('.')) {
        if (display.textContent === '' || multipleOperatorExists) {
            clearDisplay();
            displayText("0.");
        } else {
            displayText(decimalKey.textContent);
        }
    }
});

const deleteKey = document.querySelector("#delete");
deleteKey.addEventListener('click', () => {
    if (display.textContent !== '') {
        display.textContent = display.textContent.slice(0, -1);
    }
});

let clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true
});

window.addEventListener('keydown', function(e) {
    let btn; 
    switch (e.key) {
        case "0":
            btn = this.document.querySelector('#zero');
            break;
        case "1":
            btn = this.document.querySelector("#one");
            break;
        case "2":
            btn = this.document.querySelector('#two');
            break;
        case "3":
            btn = this.document.querySelector('#three');
            break;
        case "4":
            btn = this.document.querySelector("#four");
            break;
        case "5":
            btn = this.document.querySelector('#five');
            break;
        case "6":
            btn = this.document.querySelector('#six');
            break;
        case "7":
            btn = this.document.querySelector('#seven');
            break;
        case "8":
            btn = this.document.querySelector('#eight');
            break;
        case "9":
            btn = this.document.querySelector('#nine');
            break;
        case "+":
            btn = this.document.querySelector('#add');
            break;
        case "-":
            btn = this.document.querySelector('#subtract');
            break;
        case "*":
            btn = this.document.querySelector('#multiply');
            break;
        case "/":
            btn = this.document.querySelector('#divide');
            break;
        case "=":
        case "Enter":
            btn = this.document.querySelector('#equals');
            break;
        case "Backspace":
            btn = this.document.querySelector('#delete');
            break;
        case ".":
            btn = this.document.querySelector('#decimal');
            break;
    }
    if (btn) {
        btn.dispatchEvent(clickEvent);
    }
})