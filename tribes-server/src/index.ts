
// MONGO DB
// Connects to the mongo database
// -----------------------
import connection from './database/connection'

// REST SERVER
// Creates the rest server and start it
// -----------------------
import startup from './servlets/server'

// LOGS
// Sets up the global log level for the server
// -----------------------
import { LOG_CONFIG } from 'ap-utils-logger'
LOG_CONFIG.debug()

connection.open(startup)
