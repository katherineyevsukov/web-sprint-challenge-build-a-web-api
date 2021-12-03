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
      ? next({
          status: 404,
          message: `sorry, no project with id ${id} was found`,
        })
      : (req.projFromDb = proj);
    next();
  } catch (err) {
    next(err);
  }
}

function validateProject(req, res, next) {
  !req.body.name ||
  !req.body.name.trim() ||
  !req.body.description ||
  !req.body.description.trim()
    ? next({ status: 400, message: "name and description are required" })
    : next();
}

function validateCompletion(req, res, next){
    req.body.completed === undefined ?
    next({ status: 400, message: 'completion status required'}) :
    next()
}

module.exports = { checkId, validateProject, validateCompletion };
