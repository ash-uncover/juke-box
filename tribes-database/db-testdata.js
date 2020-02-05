db.dropDatabase()

db.users.drop()
db.users.createIndex({"id": 1}, {"unique": true})

db.tribes.drop()
db.tribes.createIndex({"id": 1}, {"unique": true})

db.memberships.drop()
db.memberships.createIndex({"id": 1}, {"unique": true})

db.events.drop()
db.events.createIndex({"id": 1}, {"unique": true})

db.participations.drop()
db.participations.createIndex({"id": 1}, {"unique": true})

// Users
// ---------------------------------------
db.users.insert({
    "id":"userantoine",
    "username":"antoine",
    "password":"antoine"
})
db.users.insert({
    "id":"userkarima",
    "username":"karima",
    "password":"karima"
})
db.users.insert({
    "id":"useralberto",
    "username":"alberto",
    "password":"alberto"
})

// Sections
// ---------------------------------------
db.tribes.insert({
    "id":"tribebanana",
    "name":"Banana Kidz",
    "image":""
})

// Membership
// ---------------------------------------
db.memberships.insert({
    "id":"antoinebanana",
    "userId":"antoine",
    "tribeId":"tribebanana"
})
db.memberships.insert({
    "id":"karimabanana",
    "userId":"karima",
    "tribeId":"tribebanana"
})