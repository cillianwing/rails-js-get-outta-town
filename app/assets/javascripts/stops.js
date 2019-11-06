$(function() {
	listenForTripStopsClick();
	$('#popoverData').popover();
})

function listenForTripStopsClick() {
	$('a#user-trip-stops').on('click', function(event) {
		event.preventDefault();
		let userId = $('a#user-trip-stops')["0"]["name"];
		getTripStops(userId)
	})
}

