var $ = require('jquery');
var digit = "";
// var number = 0;
var display = $("#out");
var dot = '.';

function Number() {
    this.number = 0;
    this.showResult = function() {
        console.log('Number.showResult', this.result);
    }
}

Number.prototype.collect = function(input) {
    console.log('dupa');
    if (input == dot) {
        if (digit == "") digit += "0.";
        else digit += ".";
    }
    else {
        digit +=  input; // digit jako string, klejenie stringa
        this.number = parseFloat(digit); //zamiana na liczbę zmiennoprzecinkową
        return this.number;
    }
};

Number.prototype.display = function() {
    display.text(this.number);
};

module.exports = Number;