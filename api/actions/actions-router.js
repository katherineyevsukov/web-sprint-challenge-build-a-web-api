// Write your "actions" router here!
const router = require('express').Router()
const Action = require('./actions-model')

router.get('/', async (req, res, next) => {
    try {
        const actions = await Action.get()
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})

module.exports = router
