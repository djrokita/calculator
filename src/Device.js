var $ = require('jquery');
var digit = "";
var display = $("#out");
var dot = '.';

function Device() {
    this.number = 0;
    this.numbersArray = [];
    this.functionInUse = 'none';
}

Device.prototype.collect = function(input) {
    this.numbersArray.push(input);
    /*
    if(this.number.length < 13) {
    }
    else this.number.toExponential(12);
    */
    // console.log('this.number', this.number);
};

Device.prototype.display = function() {
    var numleng = this.numbersArray.length;
    var numbersArrayReverse = [];
    if (numleng < 13) {
        for (var i = numleng; i >= 0; i--) {
            for(var j = 0; j <= 0; j++) {
                numbersArrayReverse.push(this.numbersArray[i]);
            }
        }
        for (var l = 0; l <= numleng; l++) {
            display.find('#' + l).text(numbersArrayReverse[l]);
        }
    }
    var newNumber = this.numbersArray.join('');
    this.number = parseInt(newNumber);
};

Device.prototype.clearDisplay = function() {
    display.text(0);
};

Device.prototype.clearMemory = function() {
    this.number = 0;
    this.numbersArray = [];
}

module.exports = Device;