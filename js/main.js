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
    /*const type = key.dataset.type;*/
    const { type } = key.dataset;
    /*above statement is equal to the one above with .type*/
    const { previousKeyType } = calculator.dataset;

    
    //is this a number key?
    if(type === 'number'){
        if(displayValue === '0'){
            display.textContent = keyValue;
        } else if (previousKeyType ==='operator'){
            display.textContent = keyValue;

        } else {
            display.textContent = displayValue + keyValue;
        }
    }

    //is this an operator key?
    if(type === 'operator'){
        //using dataset attribute to record state?
        //this instruction adds info to the dom?
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
        operatorKeys.forEach(el =>{ el.dataset.state = ''});
    
        /*another way of determine wich operator is selected:
        const currentActiveOperator = calculator.querySelector([data-state='selected']);
        if(currentActiveOperator){
        currentActiveOperator.dataset.state = ''}*/

        key.dataset.state = 'selected';
    }

    if(type === 'equal'){
        //perform a calculation
    }

    calculator.dataset.previousKeyType = type;

    console.log(key);
    console.log(key.textContent);
    console.log(key.classList);
    console.log(displayValue);
    console.log(keyValue);
    console.log(typeof displayValue); /*it's a string*/

});
/*we are going to use a event allocation pattern so we don't need
to write query selectors and event listeners for all buttons*/