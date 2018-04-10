var $ = require('jquery');
var digit = "";
var display = $("#out");
var dot = '.';

function Number(input) {
    this.firstValue = input;
    this.secondValue = 0;
    this.result = 0;
}

Number.prototype.collect = function(input) {
    if (input == dot) {
        if (digit == "") digit += "0.";
        else digit += ".";
    }
    else {
        digit +=  input; // digit jako string, klejenie stringa
        this.secondValue = parseFloat(digit); //zamiana na liczbę zmiennoprzecinkową
        return this.secondValue;
    }
};

Number.prototype.add = function() {
    this.result = this.firstValue + this.secondValue;
    display.text(this.result);
    // return this.firstValue + this.secondValue;
};

module.exports = Number;