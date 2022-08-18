const db = require("../models")
const Driver = db.drivers
const Vehicle = db.vehicles

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Request body empty!" })
  }

  const { vehicle, available } = req.body

  try {
    const vehicleCheck = await Vehicle.findById(vehicle)

    if (vehicleCheck) {
      const driver = new Driver({
        vehicle,
        available,
      })

      await driver
        .save()
        .then((data) => {
          res.status(200).send({
            message: "Driver profile created successfully!",
            profile: data._id,
          })
        })
        .catch((err) => {
          throw err
        })
    } else {
      return res.status(400).send({
        message: "Please register your vehicle first!",
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while creating a driver profile!",
    })
  }
}

exports.getinfo = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "Invalid ID!" })
  }

  const id = req.params.id

  try {
    await Driver.findById(id)
      .populate("vehicle")
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: "Invalid ID!" })
        } else return res.status(200).send(data)
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while fetching driver profile!",
    })
  }
}

exports.update = async (req, res) => {
  if (!req.body || !req.params.id) {
    return res.status(400).send({ message: "Invalid request!" })
  }

  const id = req.params.id
  const { available } = req.body.available

  try {
    await Driver.findByIdAndUpdate(
      id,
      { available },
      { useFindAndModify: false }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: "Invalid id!",
          })
        } else
          return res
            .status(200)
            .send({ message: "Driver updated successfully." })
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while updating driver profile!",
    })
  }
}