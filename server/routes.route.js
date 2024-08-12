const { Router } = require("express");
const { allUsers } = require("./controllers/User.controller");

const apiRouter = Router();

apiRouter.get("/users", allUsers);

module.exports = apiRouter;
