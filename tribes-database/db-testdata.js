db.dropDatabase()

db.users.drop()
db.users.createIndex({"id": 1}, {"unique": true})

db.sections.drop()
db.sections.createIndex({"id": 1}, {"unique": true})

db.events.drop()
db.events.createIndex({"id": 1}, {"unique": true})

db.memberships.drop()
db.memberships.createIndex({"id": 1}, {"unique": true})

db.participations.drop()
db.participations.createIndex({"id": 1}, {"unique": true})

// Users
// ---------------------------------------
db.users.insert({
    "id":"useralexis",
    "username":"alexis.gue@sap.com",
    "password":"alexis",
    "firstName":"Alexis",
    "lastName":"Gue",
    "email":"alexis.gue@sap.com",
    "roles":[]
})
db.users.insert({
    "id":"userantoine",
    "username":"antoine.maillard@sap.com",
    "password":"antoine",
    "firstName":"Antoine",
    "lastName":"Maillard",
    "email":"antoine.maillard@sap.com",
    "roles":["admin"]
})
db.users.insert({
    "id":"userchristophe",
    "username":"christophe.jeannin@sap.com",
    "password":"christophe",
    "firstName":"Christophe",
    "lastName":"Jeannin",
    "email":"christophe.jeannin@sap.com",
    "roles":[]
})
db.users.insert({
    "id":"usersylvain",
    "username":"sylvain.rabette@sap.com",
    "password":"sylvain",
    "firstName":"Sylvain",
    "lastName":"Rabette",
    "email":"sylvain.rabette@sap.com",
    "roles":[]
})
db.users.insert({
    "id":"userjordan",
    "username":"jordan.honyiglo@sap.com",
    "password":"jordan",
    "firstName":"Jordan",
    "lastName":"Honyiglo",
    "email":"jordan.honyiglo@sap.com",
    "roles":[]
})
db.users.insert({
    "id":"userziad",
    "username":"ziad.akl@sap.com",
    "password":"ziad",
    "firstName":"Ziad",
    "lastName":"Akl",
    "email":"ziad.akl@sap.com",
    "roles":[]
})

// Sections
// ---------------------------------------
db.sections.insert({
    "id":"basketball",
    "name":"Basketball",
    "description":"Bienvenue dans la section Basketball !",
    "avatar":"/assets/test/images/sections/basketball_background.png",
    "icon":"/assets/test/images/sections/basketball_white.png",
    "iconSelected":"/assets/test/images/sections/basketball.png"
})
db.sections.insert({
    "id":"brainstorm",
    "name":"Brainstorm",
    "description":"Avis aux amateurs de houblon !",
    "avatar":"/assets/test/images/sections/brainstorm_background.png",
    "icon":"/assets/test/images/sections/brainstorm_white.png",
    "iconSelected":"/assets/test/images/sections/brainstorm.png"
})
db.sections.insert({
    "id":"games",
    "name":"Jeux de société",
    "description":"ACAA - Jeux de société",
    "avatar":"/assets/test/images/sections/games_background.png",
    "icon":"/assets/test/images/sections/games_white.png",
    "iconSelected":"/assets/test/images/sections/games.png"
})

// Memberships
// ---------------------------------------
db.memberships.insert({
    "id":"basketchristophe",
    "sectionId":"basketball",
    "userId":"userchristophe",
    "roles":["admin"]
})
db.memberships.insert({
    "id":"basketalexis",
    "sectionId":"basketball",
    "userId":"useralexis",
    "roles":["admin"]
})
db.memberships.insert({
    "id":"basketantoine",
    "sectionId":"basketball",
    "userId":"userantoine",
    "roles":["admin"]
})
db.memberships.insert({
    "id":"brainstormantoine",
    "sectionId":"brainstorm",
    "userId":"userantoine",
    "roles":["admin"]
})
db.memberships.insert({
    "id":"brainstormsylvain",
    "sectionId":"brainstorm",
    "userId":"usersylvain",
    "roles":["admin"]
})
db.memberships.insert({
    "id":"brainstormalexis",
    "sectionId":"brainstorm",
    "userId":"useralexis",
    "roles":[]
})
db.memberships.insert({
    "id":"gamesziad",
    "sectionId":"games",
    "userId":"userziad",
    "roles":["admin"]
})
db.memberships.insert({
    "id":"gamesantoine",
    "sectionId":"games",
    "userId":"userantoine",
    "roles":["admin"]
})

// Events
// ---------------------------------------
db.events.insert({
    "id":"basket0",
    "sectionId":"basketball",
    "name":"Session du 9 Juin 2018",
    "description":"Scéance d'entrainement",
    "place":"Gymnase Gabriel Peri",
    "participationsMax":10,
    "date": new Date("2018-06-09")
})
db.events.insert({
    "id":"basket1",
    "sectionId":"basketball",
    "name":"Session du 18 Juin 2018",
    "description":"Scéance d'entrainement",
    "place":"Gymnase Gabriel Peri",
    "participationsMax":10,
    "date": new Date("2018-06-18")

})
db.events.insert({
    "id":"basket2",
    "sectionId":"basketball",
    "name":"Session du 25 Juin 2018",
    "description":"Scéance d'entrainement",
    "place":"Gymnase Gabriel Peri",
    "participationsMax":10,
    "date": new Date("2018-06-25")
})
db.events.insert({
    "id":"basket3",
    "sectionId":"basketball",
    "name":"Session du 2 Juillet 2018",
    "description":"Scéance d'entrainement",
    "place":"Gymnase Gabriel Peri",
    "participationsMax":10,
    "date": new Date("2018-07-02")
})



// Participations
// ---------------------------------------
db.participations.insert({
    "id":"basket0christophe",
    "membershipId":"basketchristophe",
    "eventId":"basket0",
    "isParticipating":true
})
db.participations.insert({
    "id":"basket0alexis",
    "membershipId":"basketalexis",
    "eventId":"basket0",
    "isParticipating":false
})
db.participations.insert({
    "id":"basket0antoine",
    "membershipId":"basketantoine",
    "eventId":"basket0",
    "isParticipating":true
})
db.participations.insert({
    "id":"basket1antoine",
    "membershipId":"basketantoine",
    "eventId":"basket1",
    "isParticipating":true
})
