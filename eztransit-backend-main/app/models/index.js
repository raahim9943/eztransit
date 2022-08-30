const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = process.env.ATLAS_URI

db.userModel = require("./user.model")(mongoose)
db.passengerModel = require("./passenger.model")(mongoose)
db.driverModel = require("./driver.model")(mongoose)
db.vehicleModel = require("./vehicle.model")(mongoose)
db.adminModel = require("./admin.model")(mongoose)

module.exports = db
