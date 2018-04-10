function Number(input) {
    // var self = this;
    this.result = input;
    this.addition = function(value) {
        return this.result + value;
    }
    this.showResult = function() {
        console.log('Number.showResult', this.result);
    }
}

module.exports = Number;