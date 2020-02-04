import * as express from 'express'

const server = express()

server.get('/', (req, res) => {
  res.send('Hello World')
})

// Tribes endpoint
server.get('/rest/tribes', (req, res) => {
  res.send('Get All Tribes')
})
server.get('/rest/tribes/:id', (req, res) => {
  res.send('Get Tribe ' + req.params.id)
})
server.post('/rest/tribes/:id', (req, res) => {
  res.send('Post Tribes')
})
server.put('/rest/tribes/:id', (req, res) => {
  res.send('Put Tribes')
})
server.patch('/rest/tribes/:id', (req, res) => {
  res.send('Patch Tribe')
})
server.delete('/rest/tribes/:id', (req, res) => {
  res.send('Delete Tribe')
})

server.get('/rest/tribes/:id/users', (req, res) => {
  res.send('Get Tribe users')
})

const PORT = process.env.PORT || 3090;

server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
