// Write your "actions" router here!
const router = require("express").Router();
const { checkId, validateAction, validateCompletion } = require("./actions-middlware");
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

router.put('/:id', validateAction, validateCompletion, checkId, async (req, res, next) => {
    try {
        const updated = await Action.update(req.params.id, req.body)
        res.status(200).json(updated)
    } catch(err) {
        next(err)
    }
})

module.exports = router;
