async function peopleInSpace() {
    let response = await fetch("//api.open-notify.org/astros.json");
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
			flyByTimes(myLocation);
			let google_map_pos = new google.maps.LatLng( myLocation.lat, myLocation.long );
			const google_maps_geocoder = new google.maps.Geocoder();
                google_maps_geocoder.geocode(
                    { 'latLng': google_map_pos },
                    function( results, status ) {
                        if ( status == google.maps.GeocoderStatus.OK && results[0] ) {
                            let currentlocation = results[0].formatted_address;
                            $(".myCurrentLocation").text(currentlocation);
                        } else {
                        	$(".myCurrentLocation").text("Error determining your current location");
						}
                    }
                );
		});

	} else {
		console.log("Browser doesn't support geolocation!");
	}
}

async function flyByTimes(position) {
	$.getJSON(`//api.open-notify.org/iss-pass.json?lat=${position.lat}&lon=${position.long}&alt=20&n=5&callback=?`, function (data) {
		data["response"].forEach(function (d) {
			let date = new Date(d["risetime"] * 1000);
			$(".fly-by").append("<li>" + date.toString() + "</li>");
		});
	});
}

async function getPosition() {
    let response = await fetch('//api.open-notify.org/iss-now.json');
	if (response.ok) {
		let data = await response.json();
		return data.iss_position;
	} else {
		throw new Error(response.status);
	}
}