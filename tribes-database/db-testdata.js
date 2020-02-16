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

// USERS //

db.users.insert({
  "id":"userantoine",
  "username":"a",
  "password":"a",
  "image":""
})
db.users.insert({
  "id":"userkarima",
  "username":"karima",
  "password":"karima",
  "image":""
})
db.users.insert({
  "id":"useralberto",
  "username":"alberto",
  "password":"alberto",
  "image":""
})

// TRIBES //

db.tribes.insert({
  "id":"tribebanana",
  "name":"Banana Kidz",
  "image":"images/tribebanana.jpg"
})
db.tribes.insert({
  "id":"tribeavalon",
  "name":"Avalon",
  "image":"images/tribeavalon.jpg"
})

// MEMBERSHIPS //

db.memberships.insert({
  "id":"antoinebanana",
  "userId":"userantoine",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"karimabanana",
  "userId":"userkarima",
  "tribeId":"tribebanana"
})

db.memberships.insert({
  "id":"antoineavalon",
  "userId":"userantoine",
  "tribeId":"tribeavalon"
})
db.memberships.insert({
  "id":"albertoavalon",
  "userId":"useralberto",
  "tribeId":"tribeavalon"
})