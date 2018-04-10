var $ = require('jquery');
var digit = "";
var display = $("#out");
var dot = '.';

function Device() {
    // var self = this;
    // this.number = collect();
    this.number = 0;
    this.showResult = function() {
        console.log('Device.showResult', this.result);
    }
}

Device.prototype.collect = function(input) {
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

Device.prototype.display = function() {
    display.text(this.number);
};

Device.prototype.clearDisplay = function() {
    display.text(0);
};

module.exports = Device;