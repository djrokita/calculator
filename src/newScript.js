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
		counting.setStartingValues(deviceOn.number);
	});
	
	btn.functionButton.on('click', function() {
		counting.display();
		switch($(this).text()) {
			case 'C':
				counting = new Operations();
				deviceOn.clearMemory();
				deviceOn.clearDisplay();
				break;
			case '+':
				counting.add(deviceOn.number);	
				deviceOn.clearMemory();
				break;
			case 'x':
				counting.multiply(deviceOn.number);	
				deviceOn.clearMemory();			
				break;
			case '-':
				deviceOn.isUsedFunction = true;
				counting.subtrack(deviceOn.number);
				deviceOn.clearMemory();
				break;			
		}
		switch($(this).attr('id')) {
			case 'divide':
				deviceOn.isUsedFunction = true;
				counting.divide(deviceOn.number);				
				deviceOn.clearMemory();				
				break;
			case 'square':
				console.log('dupa');
				deviceOn.isUsedFunction = true;
				counting.square(deviceOn.number);				
				deviceOn.clearMemory();								
				break;
		}
	});

});
