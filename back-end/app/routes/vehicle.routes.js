module.exports = (app) => {
    const vehicles = require("../controllers/vehicle.controller")
  
    var router = require("express").Router()
  
    router.post("/register", vehicles.create)
  
    app.use("/api/auth/vehicle", router)
  }