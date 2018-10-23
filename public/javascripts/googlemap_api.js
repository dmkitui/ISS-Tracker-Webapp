var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map-div'), {
		center: {lat: 36.0907578, lng: -119.5948303},
		zoom: 7
	});
}