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

// EVENTS //

db.events.insert({
  "id":"eventmapo",
  "name":"eventmapo",
  "tribeId": "tribemapo",
  "dateStart": new Date("2020-04-05T10:30:00Z"),
  "dateEnd": new Date("2020-04-05T17:30:00Z")
})
db.events.insert({
  "id":"eventbanana",
  "name":"eventbanana",
  "tribeId": "tribebanana",
  "dateStart": new Date("2020-02-25T10:30:00Z"),
  "dateEnd": new Date("2020-02-25T17:30:00Z")
})

// FRIENDSHIPS //

db.friendships.insert({
  "id":"antoinebulle",
  "userId":"userantoine",
  "friendId":"userbulle",
  "status":"ACTIVE"
})
db.friendships.insert({
  "id":"bulleantoine",
  "userId":"userbulle",
  "friendId":"userantoine",
  "status":"ACTIVE"
})

db.friendships.insert({
  "id":"antoinejin",
  "userId":"userantoine",
  "friendId":"userjin",
  "status":"ACTIVE"
})
db.friendships.insert({
  "id":"jinantoine",
  "userId":"userjin",
  "friendId":"userantoine",
  "status":"ACTIVE"
})

db.friendships.insert({
  "id":"antoinemya",
  "userId":"userantoine",
  "friendId":"usermya",
  "status":"ACTIVE"
})
db.friendships.insert({
  "id":"myaantoine",
  "userId":"usermya",
  "friendId":"userantoine",
  "status":"ACTIVE"
})

db.friendships.insert({
  "id":"jinbulle",
  "userId":"userjin",
  "friendId":"userbulle",
  "status":"ACTIVE"
})
db.friendships.insert({
  "id":"bullejin",
  "userId":"userbulle",
  "friendId":"userjin",
  "status":"ACTIVE"
})

db.friendships.insert({
  "id":"myabulle",
  "userId":"usermya",
  "friendId":"userbulle",
  "status":"ACTIVE"
})
db.friendships.insert({
  "id":"bullemya",
  "userId":"userbulle",
  "friendId":"usermya",
  "status":"ACTIVE"
})

db.friendships.insert({
  "id":"antoinekarima",
  "userId":"userantoine",
  "friendId":"userkarima",
  "status":"ACTIVE"
})
db.friendships.insert({
  "id":"karimaantoine",
  "userId":"userkarima",
  "friendId":"userantoine",
  "status":"ACTIVE"
})

db.friendships.insert({
  "id":"karimaenea",
  "userId":"userkarima",
  "friendId":"userenea",
  "status":"ACTIVE"
})
db.friendships.insert({
  "id":"eneakarima",
  "userId":"userenea",
  "friendId":"userkarima",
  "status":"ACTIVE"
})

// THREADS //

db.threads.insert({
  "id":"threadantoinekarima",
  "name":"",
  "type":"DIRECT",
  "userId":["userantoine","userkarima"]
})


db.threads.insert({
  "id":"threadantoinebulle",
  "name":"",
  "type":"DIRECT",
  "userId":["userantoine","userbulle"]
})

// MESSAGES //

db.messages.insert({
  "id":"messageantoinekarima1",
  "threadId":"threadantoinekarima",
  "userId":"userantoine",
  "date":new Date("2020-02-2711:50:23Z"),
  "text":"Hello",
  "readBy":["userkarima"]
})

db.messages.insert({
  "id":"messageantoinekarima2",
  "threadId":"threadantoinekarima",
  "userId":"userkarima",
  "date":new Date("2020-02-2711:51:45Z"),
  "text":"Coucou :)",
  "readBy":[]
})

db.messages.insert({
  "id":"messageantoinebulle1",
  "threadId":"threadantoinebulle",
  "userId":"userbulle",
  "date":new Date("2020-01-2710:50:23Z"),
  "text":"Coucou Antoine",
  "readBy":[]
})
