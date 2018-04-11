var $ = require('jquery');
var display = $("#out");
var dot = '.';

function Operations() {
    this.value = 0;
    this.lastValue = 0;
    this.result = 0;
    this.digit = "";
}
/*
Operations.prototype.collect = function(value) {
    if (value == dot) {
        if (this.digit == "") this.digit += "0.";
        else this.digit += ".";
    }
    else {
        this.digit +=  value; // digit jako string, klejenie stringa
        this.secondValue = parseFloat(this.digit); //zamiana na liczbę zmiennoprzecinkową
        console.log('collect.secondValue', this.secondValue);
        return this.secondValue;
    }
};
*/
Operations.prototype.display = function() {
    display.text(this.secondValue);
};

Operations.prototype.add = function(input) {
    this.lastValue = input;
    this.value += input;
    display.text(this.value);
};

Operations.prototype.addRepeat = function() {
    this.value += this.lastValue;
    display.text(this.value);    
}

// Napisz metodę do kasowania pamięci Operations!!

module.exports = Operations;