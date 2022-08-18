const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = process.env.MONGO_URI

db.users = require("./user.model")(mongoose)
db.drivers = require("./driver.model")(mongoose)
db.vehicles = require("./vehicle.model")(mongoose)

module.exports = db