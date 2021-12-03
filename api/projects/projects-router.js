const express = require("express");
const { checkId, validateProject } = require("./projects-middleware");
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
  res.status(200).json(req.projFromDb)
});

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProj = await Project.insert(req.body)
        res.status(201).json(newProj)
    } catch (err){
        next(err)
    }
})

module.exports = router;
