// Register form date field placeholder replacing with current date
var date = document.getElementById('date');

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; // January is 0!
var yyyy = today.getFullYear();

if (dd<10) {
		dd='0'+dd
};
if (mm<10) {
		mm='0'+mm
};

// Creating our date variable with content in html5 date field format
today = yyyy+'-'+mm+'-'+dd;
// Setting default value of date field in register form
date.value = today;

// Adding class to date field for hiding ::after pseudo element which is our placeholder
date.addEventListener('click', function() {
	this.classList.add('target');
});