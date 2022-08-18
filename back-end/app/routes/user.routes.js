const auth = require("../middlewares/auth")

module.exports = (app) => {
  const users = require("../controllers/user.controller")

  var router = require("express").Router()

  router.post("/register", users.signup)

  router.post("/login", users.login)

  router.get("/", auth, users.getinfo)

  router.put("/", auth, users.update)

  router.delete("/", auth, users.delete)

  app.use("/api/auth/user", router)
}