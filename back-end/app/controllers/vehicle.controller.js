const db = require("../models")
const Vehicle = db.vehicles

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Request body empty!" })
  }

  const { manufacturer, model, regNum, color } = req.body

  try {
    const alreadyExists = Vehicle.find({ regNum: regNum })

    if (alreadyExists) {
      return res.status(400).send({
        message: "Vehicle already exists in database!",
      })
    }

    const vehicle = new Vehicle({
      manufacturer,
      model,
      regNum,
      color,
    })

    await vehicle
      .save()
      .then((data) => {
        res.status(200).send({
          message: "Vehicle successfully registered!",
          profile: data._id,
        })
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while creating new vehicle!",
    })
  }
}