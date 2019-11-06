# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: "test@test.com", password: "password", password_confirmation: "password", name: "Cillian Wing", location: "Austin, TX", bio: "Test bio for Cillian...I'll fill some more out later.")
User.create(email: "test2@test.com", password: "password", password_confirmation: "password", name: "Anthony Camara", location: "San Diego, CA", bio: "Test bio for Anthony...I'll fill some more out later.")
User.create(email: "test3@test.com", password: "password", password_confirmation: "password", name: "Michael Camara", location: "San Diego, CA", bio: "Test bio for Michael...I'll fill some more out later.")

@user1 = User.find_by(id: 1)
@user2 = User.find_by(id: 2)
@user3 = User.find_by(id: 3)

@user1.trips.create(title: "Peru", description: "Two week trip to peru to trek to Macchu Picchu and then see a few cities throughout the country.", start: (Date.today+15), end: (Date.today+29), group_trip: true, creator_id: @user1.id)
@user2.trips.create(title: "Eastern Europe", description: "3 week trip through eastern Europe. Starting by flying into Prague and then seeing various other places after that.", start: (Date.today+50), end: (Date.today+71), group_trip: true, creator_id: @user2.id)
@user3.trips.create(title: "Austin", description: "Quick weekend trip to Austin to see some friends from college.", start: (Date.today+75), end: (Date.today+78), group_trip: false, creator_id: @user3.id)

@trip1 = Trip.find_by(id: 1)
@trip2 = Trip.find_by(id: 2)
@trip3 = Trip.find_by(id: 3)

