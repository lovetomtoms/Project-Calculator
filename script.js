const display = document.querySelector('#display');
const buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(button => button.addEventListener('click', displayNum));

let numLength = 11,
    num1 = 0,
    num2 = 0,
    operation = '',
    regex = /-?(0\.)?\d{0,11}/,
    count = 0;

function add(a, b) {
    return a + b;
}

function subtract(c, d) {
    return c - d;
}

function multiply(e, f) {
    return e * f;
}

function divide(g, h) {
    return g / h;
}

function operate(operator, operand1, operand2) {
    switch (operator) {
        case '÷':
            return divide(operand1, operand2);
        case '×':
            return multiply(operand1, operand2);
        case '−':
            return subtract(operand1, operand2);
        case '+':
            return add(operand1, operand2);
    }
}

function displayNum(e) {

    if (e.target.innerText === 'C') {
        display.innerText = '0';
        numLength = 11;
        num1 = 0;
        num2 = 0;
        count = 0;
        operation = '';
    }

    if (e.target.innerText === '←') {
        display.innerText = display.innerText.slice(0, -1);
        if (display.innerText === '') {
            display.innerText = '0';
        }
    }

    if (e.target.innerText === '±') {
        if (display.innerText === '0') {
            display.innerText = '-';
            numLength = 12;
        }else if (display.innerText === '-') {
            display.innerText = '0';
            numLength = 11;
        }
    }


    if (num1) {
        if (display.innerText === num1.toString()) {
            switch (e.target.innerText) {
                case '÷':
                case '×':
                case '−':
                case '+':
                    num2 = num1;
                    display.innerText = operate(operation, num1, num2).toString();
                    num1 = 0;
                    num2 = 0;
                    operation = '';
                    break;
                default:
                    if (e.target.innerText !== '=') {
                        display.innerText =  '';
                    }
            }
        } else {
            switch (e.target.innerText) {
                case '÷':
                case '×':
                case '−':
                case '+':
                    num2 = parseFloat(display.innerText);
                    display.innerText = operate(operation, num1, num2).toString();
                    num1 = 0;
                    num2 = 0;
                    operation = '';
            }
        }
    }

    if (num1.toString().length < 2) {
        if (operation) {
            if (e.target.innerText === num1.toString() && !(display.innerText.length >= 2)) {
                if (!count) {
                    count = 1;
                } else {
                        display.innerText += e.target.innerText;
                }
            }
        }
    }

    if (display.innerText === '-' && e.target.innerText === '.') {
        display.innerText = '-0.';
    }

    if (display.innerText !== '0' && display.innerText !== '-') {
        if (e.target.innerText === '±') {
            if (!display.innerText.includes('-')) {
                display.innerText = '-' + display.innerText;
                numLength = 12;
            } else {
                display.innerText = display.innerText.split('').slice(1).join('');
                numLength = 11;
            }
        }
    }

    if (display.innerText === '0.' || display.innerText === '-0.') {
        switch (e.target.innerText) {
            case '÷':
            case '×':
            case '−':
            case '+':
            case '=':
            case '%':
                display.innerText = '0';
        }
    }

    if (display.innerText === '0' || display.innerText === '') {
        switch (e.target.innerText) {
            case '.':
                display.innerText = '0' + '.';
                break;
            case '=':
            case 'C':
            case '←':
            case '÷':
            case '×':
            case '−':
            case '+':
            case '%':
                display.innerText = '0';
                break;
            default:
                if (e.target.innerText !== '±') {
                    display.innerText = '';
                }
        }
    }

    if (display.innerText.length < numLength) {
        switch (e.target.innerText) {
            case '.':
                if (!display.innerText.includes('.')) {
                    display.innerText += e.target.innerText;
                }
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (display.innerText !== '-0') {
                    display.innerText += e.target.innerText;
                }
        }
    }

    if (regex.test(display.innerText)) {
        switch (e.target.innerText) {
            case '÷':
            case '×':
            case '−':
            case '+':
                num1 = parseFloat(display.innerText);
                operation = e.target.innerText;
        }
    }

    if (num1 && !num2 && e.target.innerText === '=') {
        num2 = parseFloat(display.innerText);
        display.innerText = operate(operation, num1, num2).toString();
        num1 = 0;
        num2 = 0;
        operation = '';
    }
}