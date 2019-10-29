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
				// call prototype to input html
			})
		}
	})
}

function listenForUpcomingTripsClick() {
	$('a#user-upcoming-trips').on('click', function(event) {
		event.preventDefault();
		let userId = $('a#user-upcoming-trips')["0"]["name"];
		getUpcomingTrips(userId);
	})
}

function getUpcomingTrips(userId) {
	$.ajax({
		url: 'http://localhost:3000/users/' + userId + '/trips',
		method: 'get',
		dataType: 'json',
		success: function(data) {
			let upcomingTrips = []
			data.forEach(function(x) {
				let startDate = x["start"].split("-").join(", ");
				if (new Date(startDate) > new Date()) {
					upcomingTrips.push(new Trip(x))
					// call prototype to input html
				}
			})
		}
	})
}

function listenForPastTripsClick() {
	$('a#user-past-trips').on('click', function(event) {
		event.preventDefault();
		let userId = $('a#user-past-trips')["0"]["name"];
		getPastTrips(userId);
	})
}

function getPastTrips(userId) {
	$.ajax({
		url: 'http://localhost:3000/users/' + userId + '/trips',
		method: 'get',
		dataType: 'json',
		success: function(data) {
			let pastTrips = []
			data.forEach(function(x) {
				let endDate = x["end"].split("-").join(", ");
				if (new Date(endDate) < new Date()) {
					pastTrips.push(new Trip(x))
					// call prototype to input html
				}
			})
			debugger
		}
	})
}

function listenForNewTripClick(userId) {

}

class Trip {
	constructor(obj) {
		let startDate = obj.start.split("-").join(", ")
		let endDate = obj.end.split("-").join(", ")
		this.id = obj.id 
		this.title = obj.title
		this.description = obj.description
		this.start = new Date(startDate)
		this.end = new Date(endDate)
		this.groupTrip = obj.group_trip
		this.creatorId = obj.creator_id
		this.stops = obj.stops
		this.users = obj.users
	}
}