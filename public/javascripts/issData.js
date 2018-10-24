
async function peopleInSpace() {
    let response = await fetch("http://api.open-notify.org/astros.json");
	if (response.ok) {
		let data = await response.json();
		$.map(data.people, (entry) => {
			$(".numOfPeople").text(data.people.length);
			$(".namesOfPeople").append("<li>" + entry.name + "</li>");
		});
	} else {
		throw new Error(response.status);
	}
}

async function currentPosition() {
	if ("geolocation" in navigator) { //check geolocation available
		//try to get user current location using getCurrentPosition() method
		navigator.geolocation.getCurrentPosition(function (position) {
			let myLocation = {"lat": position.coords.latitude, "long": position.coords.longitude};
			$(".myCurrentLocation").text(`Lat: ${myLocation.lat} Lon: ${myLocation.long}`);
			flyByTimes(myLocation);
		});
	} else {
		console.log("Browser doesn't support geolocation!");
	}
}

async function flyByTimes(position) {
	$.getJSON(`http://api.open-notify.org/iss-pass.json?lat=${position.lat}&lon=${position.long}&alt=20&n=5&callback=?`, function (data) {
		data["response"].forEach(function (d) {
			let date = new Date(d["risetime"] * 1000);
			$(".fly_by").append("<li>" + date.toString() + "</li>");
		});
	});
}

async function getPosition() {
    let response = await fetch('http://api.open-notify.org/iss-now.json');
	if (response.ok) {
		let data = await response.json();
		return data.iss_position;
	} else {
		throw new Error(response.status);
	}
}