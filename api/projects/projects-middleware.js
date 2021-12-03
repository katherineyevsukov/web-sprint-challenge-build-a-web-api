// add middlewares here related to projects
const Project = require('./projects-model')

async function checkId(req, res, next){
 console.log('sup')
 next()
}

module.exports = { checkId, }
