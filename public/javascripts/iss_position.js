async function getPosition() {
    let response = await fetch('http://api.open-notify.org/iss-now.json');
	if (response.ok) {
		let data = await response.json();
		return data.iss_position;
	} else {
		throw new Error(response.status);
	}
}
