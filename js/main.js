//keys and display are children of 'calculator'
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', event => {
    /*every event contains information about what has been clicked on
    and we can get the target where the event is acting on*/
    
    /*we need to know if we are clicking in a button or in an
    intersecction -> we have a grid gap of 2px*/
    if(!event.target.closest('button')) return

    const key = event.target; //the element targeted
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    
    //is this a number key?
    if(key.classList.contains("number")){
        if(displayValue === '0'){
            display.textContent = keyValue;
        } else {
            display.textContent = displayValue + keyValue;
        }
    }

    //is this an operator key?
    key.dataset.keyType === 'operator';
    if(key.classList.contains('operator')){
        //using dataset attribute to record state?
        //this instruction adds info to the dom?
        calculator.dataset.previousKeyType = 'operator'
    }

    console.log(key);
    console.log(key.textContent);
    console.log(key.classList);
    console.log(displayValue);
    console.log(keyValue);
    console.log(typeof displayValue); /*it's a string*/

});
/*we are going to use a event allocation pattern so we don't need
to write query selectors and event listeners for all buttons*/