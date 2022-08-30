const db = require("../models")
const Vehicle = db.vehicleModel

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid Request!",
    })
  }

  const { manufacturer, model, registrationNumber, color } = req.body

  try {
    let vehicle = await Vehicle.findOne({
      registrationNumber: registrationNumber,
    })

    if (vehicle) {
      return res.status(409).send({
        message: "Vehicle already exists!",
      })
    }

    vehicle = new Vehicle({
      manufacturer,
      model,
      registrationNumber,
      color,
    })

    await vehicle
      .save()
      .then((data) => {
        res.status(200).send({
          message: "Vehicle successfully registered!",
          id: data._id,
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
