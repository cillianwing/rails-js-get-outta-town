$(function() {
	listenForTripFlightsClick();
})

function listenForTripFlightsClick() {
	$('a#user-trip-flights').on('click', function(event) {
		event.preventDefault();
		let userId = $('a#user-trip-flights')["0"]["name"];
		getTripFlights(userId)
	})
}