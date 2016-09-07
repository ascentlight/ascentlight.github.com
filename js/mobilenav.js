// Mobile navigation toggle block displaying
var hamburger = document.getElementById('hamburger');
var mobilenav = document.getElementById('mobilenav-toggle');

// Adding listener for click event on menu icon to display nav list block and disable scrolling everything except the nav
hamburger.addEventListener('click', function() {
	hamburger.classList.toggle('active');
	if (hamburger.classList.contains('active')) {
		mobilenav.style.display = 'block';
		document.body.style.overflowY = 'hidden';
	}
	else {
		mobilenav.style.display = 'none';
		document.body.style.overflowY = 'scroll';
	}
});