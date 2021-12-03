// Write your "actions" router here!
const router = require("express").Router();
const { checkId } = require("./actions-middlware");
const Action = require("./actions-model");

router.get("/", async (req, res, next) => {
  try {
    const actions = await Action.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkId, async (req, res, next) => {
    res.status(200).json(req.actionFromDb)
})

module.exports = router;
