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

function validateAction(req, res, next) {
  !req.body.project_id ||
  !req.body.description ||
  !req.body.description.trim() ||
  !req.body.notes ||
  !req.body.notes.trim()
    ? next({
        status: 400,
        message: "project id, description, and notes are all required",
      })
    : next();
}

function validateCompletion(req, res, next) {
  req.body.completed === undefined
    ? next({ status: 400, message: "completion status required" })
    : next();
}

module.exports = { checkId, validateAction, validateCompletion };
