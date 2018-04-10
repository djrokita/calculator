var $ = require('jquery');
var Number = require('./Number');
var digit = "";
var number = 0;
var display = $("#out");
var dot = '.';
// var getNumber = {};

function collect (input) {
    if (input == dot) {
        if (digit == "") digit += "0.";
        else digit += ".";
    }
    else {
        digit +=  input; // digit jako string, klejenie stringa
        number = parseFloat(digit); //zamiana na liczbę zmiennoprzecinkową
        display.text(number);
        getNumber = new Number(number);
        console.log('getNumber', getNumber);
        return getNumber;
    }
}

module.exports = { 
    collect: collect,
};