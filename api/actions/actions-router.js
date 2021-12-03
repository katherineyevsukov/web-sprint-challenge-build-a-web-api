// Write your "actions" router here!
const router = require("express").Router();
const { checkId, validateAction } = require("./actions-middlware");
const Action = require("./actions-model");

router.get("/", async (req, res, next) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkId, (req, res, next) => {
    res.status(200).json(req.actionFromDb)
})

router.post('/', validateAction, async (req, res, next) => {
    try {
        const action = await Action.insert(req.body)
        res.status(201).json(action)
    } catch(err) {
        next(err)
    }
})

module.exports = router;
