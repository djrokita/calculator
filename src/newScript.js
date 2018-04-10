var $ = require('jquery');
var btn = require('./buttons');
// var Number = require('./Number');
var Device = require('./Device');
var counting;

$(document).ready(function() {

	function switchCalculation(symbol) {
		// switch ()
	}

	var putDeviceOn = function() {
		return new Device();
	}

	var deviceOn = putDeviceOn();
	//Buttons

	btn.numberButton.on('click', function() {
		deviceOn.collect($(this).text());
		deviceOn.display();
		console.log('device', deviceOn);
	});

	btn.functionButton.on('click', function() {
		switch($(this).text()) {
			case 'C':
				deviceOn.clearDisplay();
				break;
			case '+':
				counting = new Number(102);
				console.log('firstValue', counting.firstValue);
				// counting.collect();
				// counting.add();
		}
	});
});
