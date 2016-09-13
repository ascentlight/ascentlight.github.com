(function() {
	var httpRequest;
	var formData = new FormData();
	for (var i = 0; i < elements.length; i++) {
		formData.append(elements[i].name, elements[i].value);
	}

	document.getElementById('submit-contacts').onclick = function() { makeRequest('https://script.google.com/macros/s/AKfycbx6Ilizr5AmmIY9k4vtGh-Rn1vTr9yu5TK2p_PPP-GN0O6f77NG/exec'); };

	function makeRequest(url) {
		httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
			alert('Cannot create XMLHTTP instance');
			return false;
		}
		httpRequest.onreadystatechange = alertContents;
		httpRequest.open('POST', url);
		httpRequest.send(formData);
	}

	function alertContents() {
		try {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					alert(httpRequest.responseText);
				} else {
					alert('There was a problem with the request.');
				}
			}
		}
		catch(e) {
			alert('Caught Exception: ' + e.description);
		}
	}
})();