$(function() {
	listenForAllTripsClick();
	listenForUpcomingTripsClick();
	listenForPastTripsClick();
	listenForNewTripClick();
})

function listenForAllTripsClick() {
	$('a#user-trips').on('click', function(event) {
		event.preventDefault();
		let userId = $('a#user-trips')["0"]["name"];
		getTrips(userId)
	})
}

function getTrips(userId) {
	$.ajax({
		url: 'http://localhost:3000/users/' + userId + '/trips',
		method: 'get',
		dataType: 'json',
		success: function(data) {
			let allTrips = []
			data.forEach(function(x) {
				allTrips.push(new Trip(x))
			})
			debugger
		}
	})
}

function listenForUpcomingTripsClick() {

}

function listenForPastTripsClick() {

}

function listenForNewTripClick() {

}

class Trip {
	constructor(obj) {
		this.id = obj.id 
		this.title = obj.title
		this.description = obj.description
		this.start = new Date(obj.start)
		this.end = new Date(obj.end)
		this.groupTrip = obj.group_trip
		this.creatorId = obj.creator_id
		this.stops = obj.stops
		this.users = obj.users
	}
}