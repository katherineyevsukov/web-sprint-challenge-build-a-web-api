const express = require('express');
const server = express();

server.use(express.json())

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get('/', (req, res) => {
    res.send('server up and running!')
})

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` })
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: process.env.NODE_ENV === 'PRODUCTION' ? 'sorry, there was an erorr' : err.message})
})

module.exports = server;
