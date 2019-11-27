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
			if (allTrips.length === 0) {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html("<div class='alert alert-warning col-4 text-center mx-auto'>You have not added any trips yet!<div>");				
			} else {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html(showTripsIndex(allTrips));
			}
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
			if (upcomingTrips.length === 0) {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html("<div class='alert alert-warning col-4 text-center mx-auto'>You do not have any upcoming trips!<div>");
			} else {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html(showTripsIndex(upcomingTrips));
			}
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
			if (pastTrips.length === 0) {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html("<div class='alert alert-warning col-4 text-center mx-auto'>You do not have any past trips!<div>");				
			} else {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html(showTripsIndex(pastTrips));
			}
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
		$.ajax({
			type: "POST",
			url: `http://localhost:3000/users/${userId}/trips`,
			data: values,
			dataType: "json",
			success(data) {
				let newTrip = new Trip(data)
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html(newTrip.newTripShow());
				$('#tripModal').modal('hide');
			}
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
		this.flights = obj.flights
		this.activities = obj.activities
		this.accommodations = obj.accommodations
	}
}

Trip.prototype.tripCard = function() {
	return(`
			<div class="col-4 mx-0 px-0 border border-primary rounded">
				<div class="card" style="height:275px">
					<img src="/assets/${this.imageSelect()}" class="card-img-top" style="height: 100%">
				</div>
				<div class="card-body">
					<p class="card-title text-center text-dark font-weight-bold" style="font-size: 18px; height: 50px">${this.title}:<br>${this.start.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })} - ${this.end.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p>
					<div class="row">
						<p class="col card-text text-center" style="height: 75px; overflow-y: auto">${this.description}</p>
					</div>
					<div class="row">
						<p class="col card-text mx-auto text-center" style="height: 25px">Stops: ${this.stops.length}</p>
						<p class="col card-text mx-auto text-center" style="height: 25px">Flights: ${this.flights.length}</p>
					</div>		
					<div class="row">
						<p class="col card-text mx-auto text-center" style="height: 25px">Activities: ${this.activities.length}</p>
						<p class="col card-text mx-auto text-center" style="height: 25px">Accommodations: ${this.accommodations.length}</p>
					</div>
			   	<div style="height: 50px; overflow-y: auto">				   	
				   	<p class="col card-text text-center">Travellers: ${travellers(this)}</p>				   	
			   	</div>
				</div>
			</div>
		`)
}

function showTripsIndex(arr) {
	let indexString = `<div class="row justify-content-center mb-2" style="height: 525px">`;
	for (let i = 0; i < arr.length; i++) {
		indexString += arr[i].tripCard();
		if ((i + 1) % 3 === 0) {
			indexString += (`</div><div class="row justify-content-center mb-2" style="height: 525px">`)
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

Trip.prototype.newTripShow = function() {
	return (`
			<div class="row justify-content-center" style="height: 525px">
				<div class="col-4 mx-0 px-0 border border-primary rounded">
					<div class="card" style="height:275px">
						<img src="/assets/${this.imageSelect()}" class="card-img-top" style="height: 100%">
					</div>
					<div class="card-body">
						<p class="card-title text-center text-dark font-weight-bold" style="font-size: 18px; height: 50px">${this.title}:<br>${this.start.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })} - ${this.end.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p>
						<div class="row">
							<p class="col card-text text-center" style="height: 75px; overflow-y: auto">${this.description}</p>
						</div>
						<div class="row">
							<p class="col card-text mx-auto text-center" style="height: 25px">Stops: ${this.stops.length}</p>
							<p class="col card-text mx-auto text-center" style="height: 25px">Flights: ${this.flights.length}</p>
						</div>		
						<div class="row">
							<p class="col card-text mx-auto text-center" style="height: 25px">Activities: ${this.activities.length}</p>
							<p class="col card-text mx-auto text-center" style="height: 25px">Accommodations: ${this.accommodations.length}</p>
						</div>
				   	<div style="height: 50px; overflow-y: auto">				   	
					   	<p class="col card-text text-center">Travellers: ${travellers(this)}</p>				   	
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
		getGroupTrip(userId, tripId);
	})
}

function getGroupTrip(userId, tripId) {
	$.ajax({
		url: 'http://localhost:3000/users/' + userId + '/trips/' + tripId,
		method: 'get',
		dataType: 'json',
		success: function(data) {
			let newTrip = new Trip(data)
			document.querySelector('#group-trip-modal-display').innerHTML = newTrip.tripConfirmShow()
			$('#groupTripModal').modal('show')
			listenForTripConfirm(userId, newTrip);
		}
	})
}

function listenForTripConfirm(userId, newTrip) {
	$('form#confirm_trip').submit(function(event) {
		event.preventDefault();
		let values = $(this).serialize();
		let posting = $.post(`http://localhost:3000/group_trip`, values)

		posting.done(function(data) {
			let updatedGroupTrip = new Trip(data)
			$('#groupTripModal').modal('hide');
			$('div.row').html('');
			$('div.row').html(updatedGroupTrip.groupTripShow());
		})
	})
}

Trip.prototype.tripConfirmShow = function() {
	return (`
		<div id="groupTripModal" class="modal fade" role="dialog">
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
						<p>${this.start.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })} - ${this.end.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p>
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
		<div id="group-trip-show" class="col-4 mx-0 px-0 border border-primary rounded">
			<div class="card" style="height:275px">
				<img src="/assets/${this.imageSelect()}" class="card-img-top" style="height: 100%">
			</div>
			<div class="card-body">
				<p class="card-title text-center text-dark font-weight-bold" style="font-size: 18px; height: 50px">${this.title}:<br>${this.start.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })} - ${this.end.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p>
				<div class="row">
					<p class="col card-text text-center" style="height: 75px; overflow-y: auto">${this.description}</p>
				</div>
				<div class="row">
					<p class="col card-text mx-auto text-center" style="height: 25px">Stops: ${this.stops.length}</p>
					<p class="col card-text mx-auto text-center" style="height: 25px">Flights: ${this.flights.length}</p>
				</div>		
				<div class="row">
					<p class="col card-text mx-auto text-center" style="height: 25px">Activities: ${this.activities.length}</p>
					<p class="col card-text mx-auto text-center" style="height: 25px">Accommodations: ${this.accommodations.length}</p>
				</div>
		   	<div style="height: 50px; overflow-y: auto">				   	
			   	<p class="col card-text text-center">Travellers: ${travellers(this)}</p>				   	
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

Trip.prototype.imageSelect = function() {
	let month = this.start.toLocaleDateString().split("/")[0]
	if (month === "1") {
		return "january.jpg"
	} else if (month === "2") {
		return "february.jpg"
	} else if (month === "3") {
		return "march.jpg"
	} else if (month === "4") {
		return "april.jpg"
	} else if (month === "5") {
		return "may.jpg"
	} else if (month === "6") {
		return "june.jpg"
	} else if (month === "7") {
		return "july.jpg"
	} else if (month === "8") {
		return "august.jpg"
	} else if (month === "9") {
		return "september.jpg"
	} else if (month === "10") {
		return "october.jpg"
	} else if (month === "11") {
		return "november.jpg"
	} else if (month === "12") {
		return "december.jpg"
	}
}

function travellers(trip) {
	let travellersArray = []
	trip.users.forEach(function(hash) {
		travellersArray.push(hash.name)
	})
	return travellersArray.join(", ")
}

function getTripStops(userId) {
	$.ajax({
		url: 'http://localhost:3000/users/' + userId + '/trips',
		method: 'get',
		dataType: 'json',
		success: function(data) {
			let allTrips = []
			data.forEach(function(x) {
				allTrips.push(new Trip(x))
			})
			if (allTrips.length === 0) {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html("<div class='alert alert-warning col-4 text-center mx-auto'>You have not added any trips yet!<div>");				
			} else {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html(showTripStopsIndex(allTrips));
			}
		}
	})
}

Trip.prototype.tripStopsCard = function() {
	return (`
			<div class="col-sm-4 px-0 border border-primary rounded">
				<div class="card">
					<img src="/assets/${this.imageSelect()}" class="card-img-top">
				</div>
				<div class="card-body">
					<strong><p class="card-title text-center">${this.title}: ${this.start.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })} - ${this.end.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p></strong>
					<p class="card-text text-center">${this.description}</p>
					<a href="trips/${this.id}/stops">
						<input id="trip-stop" type="button" class="btn btn-info col" value="Select Trip">
					</a>					
				</div>
			</div>
		`)
}

function showTripStopsIndex(arr) {
	let indexString = `<div class="row justify-content-center mb-2">`;
	for (let i = 0; i < arr.length; i++) {
		indexString += arr[i].tripStopsCard();
		if ((i + 1) % 3 === 0) {
			indexString += (`</div><div class="row justify-content-center mb-2">`)
		}
	}
	return indexString;
}

function getTripFlights(userId) {
	$.ajax({
		url: 'http://localhost:3000/users/' + userId + '/trips',
		method: 'get',
		dataType: 'json',
		success: function(data) {
			let allTrips = []
			data.forEach(function(x) {
				allTrips.push(new Trip(x))
			})
			if (allTrips.length === 0) {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html("<div class='alert alert-warning col-4 text-center mx-auto'>You have not added any trips yet!<div>");				
			} else {
				$('div.row').html("");
				$('div.js-render-content').html("");
				$('div.js-render-content').html(showTripFlightsIndex(allTrips));
			}
		}
	})
}

Trip.prototype.tripFlightsCard = function() {
	return (`
			<div class="col-sm-4 px-0 border border-primary rounded">
				<div class="card">
					<img src="/assets/${this.imageSelect()}" class="card-img-top">
				</div>
				<div class="card-body">
					<strong><p class="card-title text-center">${this.title}: ${this.start.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })} - ${this.end.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</p></strong>
					<p class="card-text text-center">${this.description}</p>
					<a href="trips/${this.id}/flights">
						<input id="trip-stop" type="button" class="btn btn-info col" value="Select Trip">
					</a>					
				</div>
			</div>
		`)
}

function showTripFlightsIndex(arr) {
	let indexString = `<div class="row justify-content-center mb-2">`;
	for (let i = 0; i < arr.length; i++) {
		indexString += arr[i].tripFlightsCard();
		if ((i + 1) % 3 === 0) {
			indexString += (`</div><div class="row justify-content-center mb-2">`)
		}
	}
	return indexString;
}