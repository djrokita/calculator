$(document).ready(function() {

var cyfra = "";
var num = 0;
var ekran = $("#out");
var dot = '.';


var kwadrat = [];
var pierw = [];
var proc = [];
var liczby= [];

var typ_dzialania = 0;

var wynik = 0;
var wynik_suma = 0;
var wynik_iloczyn = 1;
var wynik_roznica = 0;
var wynik_iloraz = 0;
var wynik_potega = 0;
var wynik_proc = 0;
var wynik_pierw = 0;
var getNumber;

//klasa dla wprowadzonej liczby
function Number(input) {
	// var self = this;
	this.result = input;
	this.addition = function(value) {
  	 return this.result + value;
	}
	this.showResult = function() {
		console.log(this.result);
	}
}
// zbieram cyfry z klawiszy w jedną liczbę
function zbierz(numer) {
	if (numer == dot) {
		if (cyfra == "") cyfra += "0.";
		else cyfra += ".";
	}
		else {
		cyfra +=  numer; // cyfra jako string, klejenie stringa
		num = parseFloat(cyfra); //zamiana na liczbę zmiennoprzecinkową
		ekran.text(num);
		getNumber = new Number(num);
		return getNumber;
	}
}

Number.prototype.collect = function(input) {
	if (input == dot) {
		if (cyfra == "") cyfra += "0.";
		else cyfra += ".";
	}
		else {
		cyfra +=  input; // cyfra jako string, klejenie stringa
		num = parseFloat(cyfra); //zamiana na liczbę zmiennoprzecinkową
		ekran.innerHTML = num;
		return num;
	}
};

function kasujEkran() {
	ekran.innerHTML = 0;
}

var createNumberObject = function(param) {
	return new Number(param);
}

//Buttons
var additionButton = $('#plus');
var equalButton = $('#equal');
var buttonNumber = $('.number');

buttonNumber.on('click', function(event) {
	zbierz($(this).text());
	console.log(getNumber.result);
});

/*
additionButton.addEventListener('click', function() {
	getNumber = createNumberObject(num);
	kasujEkran();
	getNumber.showResult();
});
*/
// equalButton.addEventListener('click', dupa);

function licz_dodaj(wart)
{
	liczby.push(wart);
	wynik_suma = 0;
	for (i = 0; i < liczby.length; i++)
	{
		wynik_suma += liczby[i];
	}
	wynik = wynik_suma;
	typ_dzialania = 1;
}

function licz_mnoz(wart)
{
	liczby.push(wart);
	wynik_iloczyn = 1;
	for (i = 0; i < liczby.length; i++)
	{
		wynik_iloczyn *= liczby[i];
	}
	wynik = wynik_iloczyn;
	typ_dzialania = 2;
}

function licz_odejmij(wart)
{
	liczby.push(wart);
	wynik_roznica = 2 * liczby[0];
	for (i = 0; i < liczby.length; i ++)
	{
		wynik_roznica -= liczby[i];
	}
	wynik = wynik_roznica;
	typ_dzialania = 3;
}

function licz_dziel(wart)
{
	liczby.push(wart);
	wynik_iloraz = liczby[0]  * liczby[0];
	for (i = 0; i < liczby.length; i ++)
	{
		wynik_iloraz /= liczby[i];
	}
	wynik = wynik_iloraz;
	typ_dzialania = 4;
}

function licz_kwadrat(wart)
{
	wynik_potega = Math.pow(wart, 2);
	for (i = 0; i < liczby.length; i ++)
	{
		wynik_potega = Math.pow(liczby[i], 2);
	}
	wynik = wynik_potega;
	liczby.push(wynik);
	typ_dzialania = 5;
}

function licz_pierwiastek(wart)
{
	wynik_pierw = Math.sqrt(wart);
	// console.log(liczby);
	for (i = 0; i < liczby.length; i ++)
	{
		wynik_pierw = Math.sqrt(liczby[i]);
	}
	wynik = wynik_pierw;
	liczby.push(wynik);
	typ_dzialania = 6;
}

function licz_proc()
{
	pomnoz();
	wynik = wynik * 0.01;
	liczby.push(wynik);
	typ_dzialania = 7;
}

function licz_dalej()
{
	// console.log(liczby);
	cyfra = "";
	result(wynik);
}

function result(liczba) //wyświetla wynik na ekranie
{
	var wynik_ekran = liczba.toString();
	if (wynik_ekran.length <= 10) ekran.innerHTML = liczba;
	else
	{
		if (liczba >= 10000000000)
		{
			ekran.innerHTML = "e"+ wynik_ekran.substr(0,9);
		}
		else
		{
		// zaokrąglam wynik do wartości mieszczącej się na wyświetlaczy, tj. do 10 cyfr
		var wynik_int = Math.round(liczba);
		var wynik_int_txt = wynik_int.toString();
		var wynik_int_ile = wynik_int_txt.length;
		var po_przecinku = 10 - 1 - wynik_int_ile;
		ekran.innerHTML = wynik.toFixed(po_przecinku);
		}
	}
	//wynik = liczba;
}

function dodaj()
{
	switch(typ_dzialania)
	{
		case 2:
			licz_mnoz(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 1;
			break;
		case 3:
			licz_odejmij(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 1;
			break;
		case 4:
			licz_dziel(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 1;
			break;
		case 5:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 1;
			break;
		case 6:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 1;
			break;
		case 7:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 1;
			break;
		default:
			licz_dodaj(num);
			break;
	}
	//typ_dzialania = 0;
	licz_dalej();
	console.log("typ działania to: " + typ_dzialania);
}

function pomnoz()
{
	switch(typ_dzialania)
	{
		case 1:
			licz_dodaj(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 2;
			break;
		case 3:
			licz_odejmij(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 2;
			break;
		case 4:
			licz_dziel(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 2;
			break;
		case 5:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 2;
			break;
		case 6:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 2;
			break;
		case 7:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 2;
			break;
		default:
			licz_mnoz(num);
			break;
	}
	licz_dalej();
}

function odejmij()
{
	switch(typ_dzialania)
	{
		case 1:
			licz_dodaj(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 3;
			break;
		case 2:
			licz_mnoz(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 3;
			break;
		case 4:
			licz_dziel(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 3;
			break;
		case 5:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 3;
			break;
		case 6:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 3;
			break;
		case 7:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 3;
			break;
		default:
			licz_odejmij(num);
			break;
	}
	licz_dalej();
}

function podziel()
{
	switch(typ_dzialania)
	{
		case 1:
			licz_dodaj(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 4;
			break;
		case 2:
			licz_mnoz(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 4;
			break;
		case 3:
			licz_odejmij(num);
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 4;
			break;
		case  5:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 4;
			break;
		case 6:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 4;
			break;
		case 7:
			liczby = [];
			liczby.push(wynik);
			typ_dzialania = 4;
			break;
		default:
			licz_dziel(num);
			break;
	}
	licz_dalej();
}

function potega()
{
	switch(typ_dzialania)
	{
		case 1:
			licz_dodaj(num);
			liczby.push(wynik);
			licz_kwadrat(wynik);
			typ_dzialania = 5;
			break;
		case 2:
			licz_mnoz(num);
			liczby.push(wynik);
			licz_kwadrat(wynik);
			typ_dzialania = 5;
			break;
		case 3:
			licz_odejmij(num);
			liczby.push(wynik);
			licz_kwadrat(wynik);
			typ_dzialania = 5;
			break;
		case 4:
			licz_dziel(num);
			liczby.push(wynik);
			licz_kwadrat(wynik);
			typ_dzialania = 5;
			break;
		case 6:
			liczby = [];
			liczby.push(wynik);
			licz_pierwiastek(wynik);
			typ_dzialania = 5;
			break;
		case 7:
			liczby = [];
			liczby.push(wynik);
			licz_kwadrat(wynik);
			typ_dzialania =  5;
			break;
		default:
			licz_kwadrat(num);
			break;
	}
	licz_dalej();
}

function pierwiastek()
{
	switch(typ_dzialania)
	{
		case 1:
			licz_dodaj(num);
			liczby.push(wynik);
			licz_pierwiastek(wynik);
			typ_dzialania = 6;
			break;
		case 2:
			licz_mnoz(num);
			liczby.push(wynik);
			licz_pierwiastek(wynik);
			typ_dzialania = 6;
			break;
		case 3:
			licz_odejmij(num);
			liczby.push(wynik);
			licz_pierwiastek(wynik);
			typ_dzialania = 6;
			break;
		case 4:
			licz_dziel(num);
			liczby.push(wynik);
			licz_pierwiastek(wynik);
			typ_dzialania = 6;
			break;
		case 5:
			liczby = [];
			liczby.push(wynik);
			licz_pierwiastek(wynik);
			typ_dzialania = 6;
			break;
		case 7:
			liczby = [];
			liczby.push(wynik);
			licz_pierwiastek(wynik);
			typ_dzialania = 6;
			break;
		default:
			licz_pierwiastek(num);
			break;
	}
	//licz_pierwiastek(num);
	licz_dalej();
}

function procent()
{
	licz_proc();
	licz_dalej();
	console.log("To działa!!!");
}

function kasuj()
{
	cyfra = "";
	result(0);
	liczby = [];
	typ_dzialania = 0;
}

function rowna_sie()
{
	switch (typ_dzialania)
	{
		case 1:
			licz_dodaj(num);
			break;
		case 2:
			licz_mnoz(num);
			break;
		case 3:
			licz_odejmij(num);
			break;
		case 4:
			licz_dziel(num);
			break;
		case 5:
			licz_kwadrat(num);
			break;
		case 6:
			licz_pierwiastek(num);
			break;
	}
	//typ_dzialania = 0;
	//liczby = [];
	licz_dalej();
	console.log("typ działania to: " + typ_dzialania);
	console.log("Zbiór liczby to: " + liczby);
}
});
