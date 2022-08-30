const auth = require("../middlewares/auth")

module.exports = (app) => {
  const passengers = require("../controllers/passenger.controller")

  var router = require("express").Router()

  router.post("/register", auth, passengers.create)

  router.get("/location/:id", auth, passengers.getLocation)

  router.put("/location/:id", auth, passengers.updateLocation)

  router.get("/pending/:id", auth, passengers.getPendingTrip)

  router.put("/pending/:id", auth, passengers.updatePendingTrip)

  router.get("/", auth, passengers.getProfile)

  app.use("/api/passenger", router)
}
