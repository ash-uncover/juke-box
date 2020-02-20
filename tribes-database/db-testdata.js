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
  "name":"Antoine",
  "image":"images/userantoine.png"
})
db.users.insert({
  "id":"userbulle",
  "username":"b",
  "password":"b",
  "name":"Bulle",
  "image":"images/userbulle.png"
})
db.users.insert({
  "id":"usermya",
  "username":"mya",
  "password":"mya",
  "name":"Mya",
  "image":"images/usermya.png"
})
db.users.insert({
  "id":"userjin",
  "username":"jin",
  "password":"jin",
  "name":"Jin",
  "image":"images/userjin.png"
})
db.users.insert({
  "id":"userkarima",
  "username":"k",
  "password":"k",
  "name":"Karima",
  "image":"images/userkarima.png"
})
db.users.insert({
  "id":"userenea",
  "username":"enea",
  "password":"enea",
  "name":"Enea",
  "image":"images/userenea.png"
})
db.users.insert({
  "id":"useralberto",
  "username":"alberto",
  "password":"alberto",
  "name":"Alberto",
  "image":"images/useralberto.png"
})
db.users.insert({
  "id":"useremmanuelle",
  "username":"emmanuelle",
  "password":"emmanuelle",
  "name":"Emmanuelle",
  "image":"images/useremma.png"
})
db.users.insert({
  "id":"userlarissa",
  "username":"larissa",
  "password":"larissa",
  "name":"Larissa",
  "image":"images/userlarissa.png"
})
db.users.insert({
  "id":"useroscar",
  "username":"oscar",
  "password":"oscar",
  "name":"Oscar",
  "image":"images/useroscar.png"
})
db.users.insert({
  "id":"userromeo",
  "username":"romeo",
  "password":"romeo",
  "name":"Roméo",
  "image":"images/userromeo.png"
})
db.users.insert({
  "id":"userludovic",
  "username":"ludovic",
  "password":"ludovic",
  "name":"Ludovic",
  "image":"images/userludovic.png"
})
db.users.insert({
  "id":"useralexandra",
  "username":"alexandra",
  "password":"alexandra",
  "name":"Alexandra",
  "image":"images/useralexandra.png"
})
db.users.insert({
  "id":"userjelan",
  "username":"jelan",
  "password":"jelan",
  "name":"Jelan",
  "image":"images/userjelan.png"
})
db.users.insert({
  "id":"userdana",
  "username":"dana",
  "password":"dana",
  "name":"Dana",
  "image":"images/userdana.png"
})

// TRIBES //

db.tribes.insert({
  "id":"tribebanana",
  "name":"Banana Kidz",
  "image":"images/tribebanana.jpg"
})
db.tribes.insert({
  "id":"tribemapo",
  "name":"Les MaPos",
  "image":"images/tribemapo.jpg"
})

// MEMBERSHIPS //

db.memberships.insert({
  "id":"antoinebanana",
  "userId":"userantoine",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"bullebanana",
  "userId":"userbulle",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"myabanana",
  "userId":"usermya",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"jinbanana",
  "userId":"userjin",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"karimabanana",
  "userId":"userkarima",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"eneabanana",
  "userId":"userenea",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"albertobanana",
  "userId":"useralberto",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"emmanuellebanana",
  "userId":"useremmanuelle",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"larissabanana",
  "userId":"userlarissa",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"oscarbanana",
  "userId":"useroscar",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"romeobanana",
  "userId":"userromeo",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"ludovicbanana",
  "userId":"userludovic",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"alexandrabanana",
  "userId":"useralexandra",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"jelanbanana",
  "userId":"userjelan",
  "tribeId":"tribebanana"
})
db.memberships.insert({
  "id":"danabanana",
  "userId":"userdana",
  "tribeId":"tribebanana"
})

db.memberships.insert({
  "id":"antoinemapo",
  "userId":"userantoine",
  "tribeId":"tribemapo"
})
db.memberships.insert({
  "id":"bullemapo",
  "userId":"userbulle",
  "tribeId":"tribemapo"
})
db.memberships.insert({
  "id":"myamapo",
  "userId":"usermya",
  "tribeId":"tribemapo"
})
db.memberships.insert({
  "id":"jinmapo",
  "userId":"userjin",
  "tribeId":"tribemapo"
})

// FRIENDS //

db.friends.insert({
  "id":"antoinebanana",
  "userId":"userantoine",
  "tribeId":"tribebanana"
})