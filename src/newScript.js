var $ = require('jquery');
var btn = require('./buttons');
var collect = require('./collect');
console.log(collect);

$(document).ready(function() {

	function switchCalculation(symbol) {
		// switch ()
	}

	function kasujEkran() {
	ekran.innerHTML = 0;
	}

	var createNumberObject = function(param) {
	return new Number(param);
	}

	//Buttons
	btn.buttonNumber.on('click', function(event) {
		collect.collect($(this).text());
		collect.getNumber.showResult();
	});
});
