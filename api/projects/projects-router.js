const express = require("express");
const { checkId, validateProject, validateCompletion } = require("./projects-middleware");
const Project = require("./projects-model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkId, (req, res, next) => {
  res.status(200).json(req.projFromDb);
});

router.post("/", validateProject, async (req, res, next) => {
  try {
    const newProj = await Project.insert(req.body);
    res.status(201).json(newProj);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateProject, validateCompletion, checkId, async (req, res, next) => {
  try {
      const edited = await Project.update(req.params.id, req.body)
      res.status(200).json(edited)
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", checkId, async (req, res, next) => {
    try {
        const removed = await Project.remove(req.params.id)
        removed === 1 ? res.status(200).json(req.projFromDb) :
        res.send(`${removed} records were deleted`)
    } catch(err) {
        next(err)
    }
})

router.get("/:id/actions", checkId, async (req, res, next) => {
    try {
        const actions = await Project.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch(err){
        next(err)
    }
})

module.exports = router;
