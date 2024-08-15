const { Router } = require("express");
const {
  allUsers,
  newUser,
  userDetails,
  modifyUser,
  removeUser,
} = require("./controllers/User.controller");
const {
  allProjects,
  newProject,
  projectDetails,
  modifyProject,
} = require("./controllers/Project.controller");

const {
  newTask,
  editTask,
  removeTask,
} = require("./controllers/Task.controller");

const apiRouter = Router();

apiRouter.get("/users", allUsers);
apiRouter.get("/user", userDetails);
apiRouter.post("/user", newUser);
apiRouter.put("/user", modifyUser);
apiRouter.delete("/user", removeUser);

apiRouter.get("/projects", allProjects);
apiRouter.get("/project", projectDetails);
apiRouter.post("/project", newProject);
apiRouter.put("/project", modifyProject);

// apiRouter.get("/tasks");
apiRouter.post("/task", newTask);
apiRouter.put("/task", editTask);
apiRouter.delete("/task", removeTask);

module.exports = apiRouter;
