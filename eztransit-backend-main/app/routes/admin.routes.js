const auth = require("../middlewares/auth")

module.exports = (app) => {
  const admin = require("../controllers/admin.controller")

  var router = require("express").Router()

  router.post("/start", admin.start)

  router.post("/login", admin.login)

  router.put("/", auth, admin.update)

  app.use("/api/auth/admin", router)
}
