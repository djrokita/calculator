var $ = require('jquery');
var display = $("#out");
var dot = '.';

function Operations() {
    this.value = 0;
    this.lastValue = 0;
    this.multiplyResult = 1;
    this.subtrackResult = 0;
    this.squareResult = 1;
    this.divideResult = 1;
    this.rootResult = 1;
    this.digit = "";
    this.isUsedFunction = false;
    this.lastResult = 0;    
}

Operations.prototype.display = function() {
    display.text(this.lastResult);
};

Operations.prototype.add = function(input) {
    if(input) {
        this.lastValue = input;
        this.value += input;
    }
    else {
        this.value += this.lastValue;
    }
    this.lastResult = this.value;
    display.text(this.value);
};

Operations.prototype.multiply = function(input) {
    if(input) {
        this.lastValue = input;
        this.multiplyResult *= this.lastValue;
    }
    else {
        this.multiplyResult *= this.lastValue;
    }
    this.lastResult = this.multiplyResult;
    display.text(this.multiplyResult);
};

Operations.prototype.setStartingValues = function(input) {
    if(!this.isUsedFunction) {
        this.subtrackResult = 2 * input;
    }
};

Operations.prototype.subtrack = function(input) {
    this.isUsedFunction = true;
    if(input) {
        this.lastValue = input;
        this.subtrackResult -= input;
    }
    else this.subtrackResult -= this.lastValue;
    this.lastResult = this.subtrackResult;
    display.text(this.subtrackResult);
};

Operations.prototype.divide = function(input) {
    if(input) {
        if(this.lastValue == 0) {
            this.divideResult = input * input;
        }
        else {
            this.divideResult = this.lastValue; 
        }
        this.divideResult /= input; 
        this.lastValue = input;
    }
    else {
        this.divideResult /= this.lastValue;
    }
    display.text(this.divideResult);
}; 

Operations.prototype.square = function(input) {
    if(input) {
        this.squareResult = this.lastValue * this.lastValue;
    }
    else {
        this.squareResult *= this.squareResult
    }
    display.text(this.squareResult);   
};

Operations.prototype.root = function(input) {
    console.log('input', typeof input);
    if(input) {
        this.rootResult = Math.sqrt(input);
    }
    else {
        this.rootResult = Math.sqrt(this.rootResult);
    }
    display.text(this.rootResult);
};

Operations.prototype.equal = function(input, action) {
    console.log('this.multiplyResult', this.multiplyResult);
    console.log('input', input);
    this.lastValue = input;
    console.log('this.lastValue', this.lastValue);
    switch(action) {
        case 'addition':
            this.value += this.lastValue;
            display.text(this.value);
            break;
        case 'multiplication':
            this.multiplyResult *= this.lastValue;
            display.text(this.multiplyResult);
            break;
    }
};

module.exports = Operations;