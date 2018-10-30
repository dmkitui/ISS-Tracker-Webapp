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
	$.getJSON("http://ip-api.com/json", function (data, status) {
	  if(status === "success") {
	    let myLocation = {"lat": data.lat, "long": data.lon};
		flyByTimes(myLocation);
		$(".myCurrentLocation").text(`${data.city}, ${data.country}`);
	  } else {
	  	$(".myCurrentLocation").text("Error determining you location");
	  	$(".fly-by").text("Fly By Times not available");
	  }
	});
}

async function flyByTimes(position) {
	$.getJSON(`http://api.open-notify.org/iss-pass.json?lat=${position.lat}&lon=${position.long}&alt=20&n=5&callback=?`, function (data) {
		data["response"].forEach(function (d) {
			let date = new Date(d["risetime"] * 1000);
			$(".fly-by").append("<li>" + date.toString() + "</li>");
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