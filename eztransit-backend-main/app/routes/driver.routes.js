const auth = require("../middlewares/auth")

module.exports = (app) => {
  const drivers = require("../controllers/driver.controller")

  var router = require("express").Router()

  router.post("/register", auth, drivers.create)

  router.get("/location/:id", auth, drivers.getLocation)

  router.put("/location/:id", auth, drivers.updateLocation)

  router.get("/pending/:id", auth, drivers.getPendingTrip)

  router.put("/pending/:id", auth, drivers.updatePendingTrip)

  router.get("/", auth, drivers.getProfile)

  app.use("/api/driver", router)
}
