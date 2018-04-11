var $ = require('jquery');
var btn = require('./buttons');
var Operations = require('./Operations');
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
				counting = new Operations(deviceOn.number);
				console.log('firstValue', counting.firstValue);
				deviceOn.clearMemory();
				console.log('deviceOn.number', deviceOn.number);
				// counting.collect();
				// counting.add();
		}
	});
});
