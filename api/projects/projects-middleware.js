// add middlewares here related to projects
const Project = require("./projects-model");

// async function checkId(req, res, next) {
//     const { id } = req.params;
//     try {
//       const proj = await Project.get(id);
//       if (!proj) {
//         res
//           .status(404)
//           .json({ message: `sorry, no project with id ${id} was found` });
//       } else {
//         req.projFromDb = proj;
//         next();
//       }
//     } catch (err) {
//       next(err);
//     }
//   }

async function checkId(req, res, next) {
  const { id } = req.params;
  try {
    const proj = await Project.get(id);
    !proj
      ? res
          .status(404)
          .json({ message: `sorry, no project with id ${id} was found` })
      : (req.projFromDb = proj);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { checkId };
