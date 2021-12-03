// Write your "actions" router here!
const router = require('express').Router()

router.get('/', (req, res, next) => {
    res.send('this is just a test')
})

module.exports = router
