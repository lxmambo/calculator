//keys and display are children of 'calculator'
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');
const operatorKeys = keys.querySelectorAll('[data-type="operator"]');


keys.addEventListener('click', event => {
    /*every event contains information about what has been clicked on
    and we can get the target where the event is acting on*/
    
    /*we need to know if we are clicking in a button or in an
    intersecction -> we have a grid gap of 2px*/
    if(!event.target.closest('button')) return

    const key = event.target; //the element targeted
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    /*const type = key.dataset.type;*/
    const { type } = key.dataset;
    /*above statement is equal to the one above with .type*/
    const { previousKeyType } = calculator.dataset;

    
    //is this a number key?
    if(type === 'number'){
        if(
            displayValue === '0' ||
            previousKeyType === 'operator'
        ) {
            display.textContent = keyValue;
        } else if (previousKeyType ==='operator') {
            display.textContent = keyValue;

        } else {
            display.textContent = displayValue + keyValue;
        }
    }

    //is this an operator key?
    if(type === 'operator'){
        //using dataset attribute to record state?
        //this instruction adds info to the dom?
        operatorKeys.forEach(el =>{ el.dataset.state = ''});
    
        /*another way of determine wich operator is selected:
        const currentActiveOperator = calculator.querySelector([data-state='selected']);
        if(currentActiveOperator){
        currentActiveOperator.dataset.state = ''}*/

        key.dataset.state = 'selected';

        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

    if(type === 'equal'){
        //perform a calculation
        const secondNumber = displayValue;
        //when we press the operator number, we reset everything
        //so we need to store what's in the display
        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        //console.log(firstNumber, operator, secondNumber);
        display.textContent = calculate(firstNumber, operator, secondNumber);   
    }

    if(type === 'clear') {
        display.textContent = '0';
        delete calculator.dataset.firstNumber;
        delete calculator.dataset.operator;
    }

    calculator.dataset.previousKeyType = type;
    /*
    console.log(key);
    console.log(key.textContent);
    console.log(key.classList);
    console.log(displayValue);
    console.log(keyValue);
    console.log(typeof displayValue); 
    */
   /*it's a string*/
});
/*we are going to use a event allocation pattern so we don't need
to write query selectors and event listeners for all buttons*/

function calculate(firstNumber, operator, secondNumber){
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    
    //version 1
    if (operator === 'plus') return firstNumber + secondNumber;
    if (operator === 'minus') return firstNumber - secondNumber;
    if (operator === 'times') return firstNumber * secondNumber;
    if (operator === 'divide') return firstNumber / secondNumber
    
    //version 2
    //let result = '';
    //switch(operator){
    //    case 'plus': result = firstNumber + secondNumber; break;
    //    case 'minus': result = firstNumber - secondNumber; break;
    //    case 'times': result = firstNumber * secondNumber; break;
    //    case 'divide': result = firstNumber / secondNumber; break;
    //}
    //return result.toFixed(2); //returning with 2 decimal places
}

// ===========================
// TESTING
// ===========================
function clearCalculator () {
    // press the clear key
    const clearKey = document.querySelector('[data-type = "clear"]');
    clearKey.click();
    // clear operator states
    operatorKeys.forEach(key => { key.dataset.state = ''})
}

function testClearKey () {
    clearCalculator();
    console.assert(display.textContent === '0', 'Clear key. Display should be 0');
    console.assert(!calculator.dataset.firstNumber, 'Clear key. No first number remains');
    console.assert(!calculator.dataset.operator, 'Clear key. No operator remains');
}

//this next variables are not necessary anymore after
//creating the testKeySequence function with objects
/*
const one = document.querySelector('[data-key="1"]');
const five = document.querySelector('[data-key="5"]');
const nine = document.querySelector('[data-key="9"]');
*/

/*
//testKeySequence function 1 -> passing a sequence of arguments
//passing an array of arguments
function testKeySequence(...keys){
    const array = [...keys];
    //pressing many keys
    array.forEach(key => {
        //pressing one key
        document.querySelector(`[data-key="${key}"]`).click();
    })

    // Assertion
    // 1. Value to assert
    // 2. Test Message
}
testKeySequence('1','5','9');
*/

//testKeySequence function 2 -> passing an object
function testKeySequence(test){
    //press keys
    test.keys.forEach(key =>{
        document.querySelector(`[data-key="${key}"]`).click();
        console.log(`${key}`);
    })
    //assertion
    console.assert(display.textContent === test.value, test.message)
    //clear calculation
    clearCalculator();
    testClearKey();
}

const tests = [ {
    keys: ['1'],
    value: '1',
    message: 'click 1'
    },{
    keys: ['1','5'],
    value: '15',
    message: 'click 15'
    },{
    keys: ['1','5','9'],
    value: '159',
    message: 'click 159'
    },{
    keys: ['2','4','plus','7','equal'],
    value: '31',
    message: 'calculation with plus'
    },{
    keys: ['3','minus','7','0','equal'],
    value: '-67',
    message: 'calculation with plus'
    },{
    keys: ['9','divide','3','equal'],
    value: '3',
    message: 'calculation with divide'
    },{
    keys: ['9','divide','0','equal'],
    value: 'infinity',
    message: 'calculation. divide by zero.'
    },{
    keys: ['1','5','times','9','equal'],
    value: '135',
    message: 'calculation with times'
}];

tests.forEach(testKeySequence)

/*
// One test
one.click();
console.assert(display.textContent === '1', 'Clicked One');
// after every test we need to run a clear function
setTimeout(_ => {
    clearCalculator();
    testClearKey();
}, 1000);

//one.addEventListener('click', event => {
//    console.log('hello!')
//})

// 15 test
one.click();
five.click();
console.assert(display.textContent === '15', 'click 1 and 5');
clearCalculator();
testClearKey();

//159
one.click();
five.click();
nine.click();
console.assert(display.textContent === '159', 'clicked 1 and 5');
clearCalculator();
testClearKey();*/