db.dropDatabase()

db.users.drop()
db.users.createIndex({"id": 1}, {"unique": true})
db.users.createIndex({"username": 1}, {"unique": true})
db.users.createIndex({"email": 1}, {"unique": true})

db.tribes.drop()
db.tribes.createIndex({"id": 1}, {"unique": true})

db.memberships.drop()
db.memberships.createIndex({"id": 1}, {"unique": true})

db.friendships.drop()
db.friendships.createIndex({"id": 1}, {"unique": true})

db.threads.drop()
db.threads.createIndex({"id": 1}, {"unique": true})

db.messages.drop()
db.messages.createIndex({"id": 1}, {"unique": true})

db.events.drop()
db.events.createIndex({"id": 1}, {"unique": true})

db.participations.drop()
db.participations.createIndex({"id": 1}, {"unique": true})
