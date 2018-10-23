var map;

async function initMap() {
	// Get ISS position and center map on the same.
	let position = await getPosition();
	let currentPosition = {lat: parseInt(position.latitude), lng: parseInt(position.longitude)};
	map = new google.maps.Map(document.getElementById('map-div'), {
		center: currentPosition,
		zoom: 3
	});
	let marker = new google.maps.Marker({
		position: currentPosition,
		map: map,
		icon: "images/iss.png",
		animation: google.maps.Animation.DROP,
		label: {text: `Latitude ${position.latitude}, Longitude: ${position.longitude}`, color: "white"}
	});
  	map.addListener('center_changed', function() {
		// 3 seconds after the center of the map has changed, pan back to the marker.
		window.setTimeout(function() {
		  map.panTo(marker.getPosition());
		}, 3000);
  	});
}