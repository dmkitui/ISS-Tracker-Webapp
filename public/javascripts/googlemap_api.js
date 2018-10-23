var map;
async function initMap() {
	// Get ISS position and center map on the same.
	let position = await getPosition();
	console.log('XXXX: ', position)
	map = new google.maps.Map(document.getElementById('map-div'), {
		center: {lat: parseInt(position.latitude), lng: parseInt(position.longitude)},
		zoom: 7
	});
}