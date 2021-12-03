const express = require('express')
const Project = require('./projects-model')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.get()
        res.status(200).json(projects)
    } catch(err){
        next(err)
    }
})

module.exports = router
