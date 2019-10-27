# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(email: "test@test.com", password: "password", password_confirmation: "password", name: "Test 1 Name", location: "Test1, Test", bio: "Test 1 bio.")
User.create(email: "test2@test.com", password: "password", password_confirmation: "password", name: "Test 2 Name", location: "Test2, Test", bio: "Test 2 bio.")
User.create(email: "test3@test.com", password: "password", password_confirmation: "password", name: "Test 3 Name", location: "Test3, Test", bio: "Test 3 bio.")

@user1 = User.find_by(id: 1)
@user2 = User.find_by(id: 2)
@user3 = User.find_by(id: 3)

@user1.trips.create(title: "Trip 1", description: "Trip 1 description.", start: (Date.today), end: (Date.today+7), group_trip: true, creator_id: @user1.id)
@user2.trips.create(title: "Trip 2", description: "Trip 2 description.", start: (Date.today+8), end: (Date.today+15), group_trip: true, creator_id: @user2.id)
@user3.trips.create(title: "Trip 3", description: "Trip 3 description.", start: (Date.today+16), end: (Date.today+25), group_trip: false, creator_id: @user3.id)