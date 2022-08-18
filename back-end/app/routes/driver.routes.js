module.exports = (app) => {
    const drivers = require("../controllers/driver.controller")
  
    var router = require("express").Router()
  
    router.post("/register", drivers.create)
  
    router.get("/:id", drivers.getinfo)
  
    router.put("/:id", drivers.update)
  
    app.use("/api/auth/driver", router)
  }