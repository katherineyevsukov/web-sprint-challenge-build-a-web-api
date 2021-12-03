const express = require("express");
const { checkId } = require("./projects-middleware");
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
module.exports = router;
