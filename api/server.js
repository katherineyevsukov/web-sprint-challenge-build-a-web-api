const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)


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
