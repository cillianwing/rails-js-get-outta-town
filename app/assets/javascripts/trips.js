$(function() {
	listenForAllTripsClick();
	listenForUpcomingTripsClick();
	listenForPastTripsClick();
	listenForNewTripClick();
	listenForGroupTripClick();
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
			$('div.row').html("");
			$('div.js-render-content').html("");
			$('div.js-render-content').html(showTripsIndex(allTrips));
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
				}
			})
			$('div.row').html("");
			$('div.js-render-content').html("");
			$('div.js-render-content').html(showTripsIndex(upcomingTrips));
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
				}
			})
			$('div.row').html("");
			$('div.js-render-content').html("");
			$('div.js-render-content').html(showTripsIndex(pastTrips));
		}
	})
}

function listenForNewTripClick(userId) {
	$('#user-new-trip').on('click', function(event) {
		event.preventDefault();
		$('#trip-modal-display').html(newTripModal(userId));
		$('#tripModal').modal('show');
		listenForNewTripCreation(userId);
	})
}

function listenForNewTripCreation(userId) {
	$('form#new_trip').submit(function(event) {
		event.preventDefault();
		let values = $(this).serialize();
		let posting = $.post(`http://localhost:3000/users/${userId}/trips`, values);

		posting.done(function(data) {
			var newTrip = new Trip(data);
		})

	})
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

Trip.prototype.tripCard = function() {
	return (`
			<div class="col-sm-4 mb-4">
				<div class="card" style="border: 1px solid black">
					<img src="/assets/global_travel.jpg" class="card-img-top">
				</div>
				<div class="card-body" style="border: 1px solid grey">
					<strong><p class="card-title text-center">${this.title}: ${this.start.toLocaleDateString()} - ${this.end.toLocaleDateString()}</p></strong>
					<p class="card-text text-center">${this.description}</p>
				</div>
			</div>
		`)
}

function showTripsIndex(arr) {
	let indexString = `<div class="row justify-content-center">`;
	for (let i = 0; i < arr.length; i++) {
		indexString += arr[i].tripCard();
		if ((i + 1) % 3 === 0) {
			indexString += (`</div><div class="row justify-content-center">`)
		}
	}
	return indexString;
}

function newTripModal(userId) {
	return (`
		<div id="tripModal" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Create New Trip Below:</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="info-form border rounded pt-3">
							<img class="img-responsive center-block" style="width: 100%" src="/assets/global_travel.jpg">
							<div class="info-form border rounded pt-3">
        				<form class="new_trip" id="new_trip" action="/users/${userId}/trips" accept-charset="UTF-8" method="post">

          				<div class="form-group px-2">
  									<label for="trip_title">Trip Title:</label>
  									<input class="form-control" placeholder="i.e. Backpacking Thru Asia" type="text" name="trip[title]" id="trip_title">
									</div>

									<div class="form-group px-2">
  									<label for="trip_description">Description:</label>
  									<textarea class="form-control" placeholder="Please write a short description of your trip here!" name="trip[description]" id="trip_description"></textarea>
									</div>

									<div class="form-group px-2">
									  <label for="trip_start">Start Date: </label>
									  <input class="form-control" type="date" name="trip[start]" id="trip_start">
									</div>

									<div class="form-group px-2">
									  <label for="trip_end">End Date: </label>
									  <input class="form-control" type="date" name="trip[end]" id="trip_end">
									</div>


				          <div class="checkbox px-2 pb-2">
				            <label for="trip_group_trip">Is this a group trip?</label>
				            <input name="trip[group_trip]" type="hidden" value="false"><input type="checkbox" value="true" name="trip[group_trip]" id="trip_group_trip">
				          </div>

          				<input value="1" type="hidden" name="trip[creator_id]" id="trip_creator_id">

          				<input id="trip-submit" type="submit" name="commit" value="Create Trip" class="form-group btn btn-success btn-block" data-disable-with="Create Trip">
								</form>      
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`)
}

function listenForGroupTripClick() {
	$('input#group-trip').on('click', function(event) {
		event.preventDefault();
		let path = $('input')["0"].name.split('-');
		let userId = path[1];
		let tripId = path[3];
		getTrip(userId, tripId);
	})
}

function listenForTripConfirm(userId, newTrip) {
	$('form#confirm_trip').submit(function(event) {
		event.preventDefault();
		let values = $(this).serialize();
		let posting = $.post(`http://localhost:3000/group_trip`, values)

		posting.done(function(data) {
			var updatedGroupTrip = new Trip(data)
			document.querySelector('div.col-sm-4').innerHTML = '';
			$('#myModal').modal('hide');
			document.querySelector('div#groupTripShow').innerHTML = updatedGroupTrip.groupTripShow();
		})
	})
}

Trip.prototype.tripConfirmShow = function() {
	return (`
		<div id="myModal" class="modal fade" role="dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">${this.title}</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<h5>Description</h5>
						<p>${this.description}</p>
						<h5>Trip Dates</h5>
						<p>${this.start.toLocaleDateString()} - ${this.end.toLocaleDateString()}</p>
						<h5>Stops</h5>
						<ul class="stops-list">
							${this.listStops()}
						</ul>
						<h5>Trip Companions</h5>
						<ul class="users-list">
							${this.listUsers()}
						</ul>
						<form id="confirm_trip" action="/group_trip" method="post">
							<input type="hidden" id="trip_id" name="trip[id]" value="${this.id}">
							<input type="submit" class="btn btn-success btn-block" value="Confirm Trip">
						</form>
					</div>
				</div>
			</div>
		</div>
	`)
}

Trip.prototype.groupTripShow = function() {
	return (`
		<div class="container">
			<div class="row">
				<div class="col-4 center-block">
					<div class="card" style="border: 1px solid black">
						<img src="/assets/global_travel.jpg" class="card-img-top">
					</div>
				   <div class="card-body" style="border: 1px solid grey">
				   	<strong><p class="card-title text-center">${this.title}: ${this.start.toLocaleDateString()} - ${this.end.toLocaleDateString()}</p></strong>
				   	<p class="card-text text-center">${this.description}</p>
				   </div>
			   </div>
			</div>
		</div>
	`)
}

Trip.prototype.listStops = function() {
	stopsString = ""
	if (this.stops.length === 0) {
		stopsString += "<li>No stops added yet</li>";
	}
	else {
		this.stops.forEach(function(array) {
			stopsString += "<li>" + array.location + "</li>";
		})
	}
	return stopsString
}

Trip.prototype.listUsers = function() {
	usersString = ""
	this.users.forEach(function(hash) {
		usersString += "<li>" + hash.name + "</li>";
	})
	return usersString
}