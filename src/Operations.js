var $ = require('jquery');
var digit = "";
var display = $("#out");
var dot = '.';

function Operations(input) {
    this.firstValue = input;
    this.secondValue = 0;
    this.result = 0;
}

Operations.prototype.collect = function(value) {
    if (value == dot) {
        if (digit == "") digit += "0.";
        else digit += ".";
    }
    else {
        digit +=  value; // digit jako string, klejenie stringa
        this.secondValue = parseFloat(digit); //zamiana na liczbę zmiennoprzecinkową
        return this.secondValue;
    }
};

Operations.prototype.add = function() {
    this.result = this.firstValue + this.secondValue;
    display.text(this.result);
    // return this.firstValue + this.secondValue;
};

module.exports = Operations;