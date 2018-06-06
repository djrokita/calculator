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
    this.lastResult = 0;
    this.isUsedFunction = false; 
    this.lastResultArray = [];   
}

Operations.prototype.display = function() {
    // display.text(this.lastResult);
    var numleng = this.lastResultArray.length;
    var numbersArrayReverse = [];
    if (numleng != 0) {
        for (var i = numleng; i >= 0; i--) {
            for(var j = 0; j <= 0; j++) {
                numbersArrayReverse.push(this.lastResultArray[i]);
            }
        }
        for (var l = 0; l <= numleng; l++) {
            display.find('#' + l).text(numbersArrayReverse[l]);
        }
    }
    else {
        console.log('dupa');
        display.find('#0').text(0);        
    }
    var newNumber = this.lastResultArray.join('');
    this.lastResult = new Number(newNumber);


};

Operations.prototype.add = function(input) {
    console.log('input', input);
    if(input) {
        this.lastValue = input;
        this.lastResult += input;
        console.log('lastResult', this.lastResult);
    }
    else {
        this.lastResult += this.lastValue;
    }
    console.log('result', this.lastResult);
    return this.lastResult;
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
    display.text(this.lastResult);
};

Operations.prototype.setStartingValues = function(input) {
    if(!this.isUsedFunction) {
        this.subtrackResult = 2 * input;
    }
}

Operations.prototype.subtrack = function(input) {
    if(input) {
        this.lastValue = input;
        this.subtrackResult -= input;
    }
    else {
        this.subtrackResult -= this.lastValue;
    }
    this.lastResult = this.subtrackResult;
    display.text(this.lastResult);
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
    this.lastResult = this.divideResult;    
    display.text(this.lastResult);
}; 

Operations.prototype.square = function(input) {
    if(input) {
        this.lastValue = input;
        this.squareResult = this.lastValue * this.lastValue;
    }
    else {
        this.squareResult *= this.squareResult
    }
    this.lastResult = this.squareResult;
    display.text(this.lastResult);   
};

Operations.prototype.root = function(input) {
    if(input) {
        this.rootResult = Math.sqrt(input);
    }
    else {
        this.rootResult = Math.sqrt(this.rootResult);
    }
    this.lastResult = this.rootResult;
    display.text(this.lastResult);
};

Operations.prototype.equal = function(action, input) {
    this.lastValue = input;
    switch(action) {
        case 'addition':
            this.lastResult += this.lastValue;
            display.text(this.lastResult);
            break;
        case 'multiplication':
            this.multiplyResult *= this.lastValue;
            display.text(this.multiplyResult);
            break;
        case 'substruction':
            this.subtrackResult -= this.lastValue;
            this.lastResult = this.subtrackResult;
            display.text(this.subtrackResult);
            break;
        case 'division':
            this.divideResult /= this.lastValue;
            display.text(this.divideResult);
            break;
        default:
            display.text(this.lastResult);
    }
};

module.exports = Operations;