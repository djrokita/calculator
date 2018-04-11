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
		counting = new Operations();
		return new Device();
	}

	var deviceOn = putDeviceOn();
	//Buttons

	btn.numberButton.on('click', function() {			
		deviceOn.collect($(this).text());
		deviceOn.display();
	});
	
	btn.functionButton.on('click', function() {
		switch($(this).text()) {
			case 'C':
				deviceOn.clearMemory();
				deviceOn.clearDisplay();
			break;
			case '+':
				if(deviceOn.number) counting.add(deviceOn.number);
				else counting.addRepeat();
				deviceOn.clearMemory();
				break;
		}
	});
});
