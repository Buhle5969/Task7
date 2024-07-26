document.addEventListener('DOMContentLoaded', function() {
    const calculatorScreen = document.getElementById('calculator-screen');
    const calculatorKeys = document.querySelector('.calculator-keys');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    function updateScreen(value) {
        calculatorScreen.value = value;
    }

    function handleNumber(number) {
        currentInput = currentInput === '' && number === '0' ? '0' : currentInput + number;
        updateScreen(currentInput);
    }

    function handleOperator(nextOperator) {
        if (operator && currentInput !== '') {
            calculate();
        }
        operator = nextOperator;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result = 0;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateScreen(currentInput);
    }

    function clearScreen() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateScreen('');
    }

    calculatorKeys.addEventListener('click', function(event) {
        const { target } = event;

        if (!target.matches('button')) return;

        if (target.classList.contains('operator')) {
            handleOperator(target.value);
            return;
        }

        if (target.classList.contains('all-clear')) {
            clearScreen();
            return;
        }

        if (target.classList.contains('equal-sign')) {
            calculate();
            return;
        }

        handleNumber(target.value);
    });
});
