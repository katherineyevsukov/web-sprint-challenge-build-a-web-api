const Action = require("./actions-model");

async function checkId(req, res, next) {
  const { id } = req.params;
  try {
    const action = await Action.get(id);
    !action
      ? next({ status: 404, message: `action with id ${id} was not found` })
      : (req.actionFromDb = action);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { checkId };
