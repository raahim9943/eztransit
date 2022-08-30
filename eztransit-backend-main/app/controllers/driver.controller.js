const db = require("../models")
const Driver = db.driverModel
const User = db.userModel

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid Request!",
    })
  }

  const { vehicleID, location } = req.body

  try {
    let driver = await Driver.findOne({
      userID: req.user.id,
    })

    if (driver) {
      return res.status(409).send({
        message: "Driver already exists!",
      })
    }

    await User.findById(req.user.id).then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "Provide correct token!",
        })
      }
    })

    driver = new Driver({
      userID: req.user.id,
      vehicleID: vehicleID,
      location,
    })

    await driver
      .save()
      .then((data) => {
        res.status(200).send({
          message: "Profile registration complete!",
          profile: data._id,
          vehicleID: data.vehicleID,
          location: data.location,
        })
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while registering for driver!",
    })
  }
}

exports.getLocation = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "Please provide an ID!" })
  }

  const driverID = req.params.id

  try {
    await Driver.findById(driverID)
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: "Invalid ID!" })
        } else {
          if (data.userID != req.user.id) {
            return res.status(400).send({
              message: "Invalid token!",
            })
          }
          return res.status(200).send({
            location: data.location,
          })
        }
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while fetching driver location!",
    })
  }
}

exports.updateLocation = async (req, res) => {
  if (!req.params.id || !req.body) {
    return res.status(400).send({ message: "Invalid request!" })
  }

  const driverID = req.params.id
  const { location } = req.body

  try {
    const driver = await Driver.findById(driverID)

    if (!driver) {
      return res.status(404).send({ message: "Invalid ID!" })
    } else {
      if (driver.userID != req.user.id) {
        return res.status(400).send({
          message: "Invalid token!",
        })
      } else {
        await Driver.findByIdAndUpdate(
          driverID,
          { location: location },
          { useFindAndModify: false }
        )
          .then((data) => {
            return res.status(200).send({
              message: "Success!",
              location: data.location,
            })
          })
          .catch((err) => {
            throw err
          })
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while updating driver location!",
    })
  }
}

exports.getPendingTrip = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "Please provide an ID!" })
  }

  const driverID = req.params.id

  try {
    await Driver.findById(driverID)
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: "Invalid ID!" })
        } else {
          if (data.userID != req.user.id) {
            return res.status(400).send({
              message: "Invalid token!",
            })
          }
          return res.status(200).send({
            pendingTrip: data.pendingTrip,
          })
        }
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while fetching driver pending trip!",
    })
  }
}

exports.updatePendingTrip = async (req, res) => {
  if (!req.params.id || !req.body) {
    return res.status(400).send({ message: "Invalid request!" })
  }

  const driverID = req.params.id
  const { pendingTrip } = req.body

  try {
    const driver = await Driver.findById(driverID)

    if (!driver) {
      return res.status(404).send({ message: "Invalid ID!" })
    } else {
      if (driver.userID != req.user.id) {
        return res.status(400).send({
          message: "Invalid token!",
        })
      } else {
        await Driver.findByIdAndUpdate(
          driverID,
          { pendingTrip: pendingTrip },
          { useFindAndModify: false }
        )
          .then((data) => {
            return res.status(200).send({
              message: "Success!",
              pendingTrip: data.pendingTrip,
            })
          })
          .catch((err) => {
            throw err
          })
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while updating driver pending trip!",
    })
  }
}

exports.getProfile = async (req, res) => {
  const userID = req.user.id

  try {
    let profile = {}

    await User.findById(userID)
      .then((data) => {
        if (!data) {
          return res.status(404).send({ message: "Invalid token!" })
        } else {
          profile = {
            id: data._id,
            name: data.name,
            email: data.email,
            userType: data.userType,
            profile: {},
          }
        }
      })
      .catch((err) => {
        throw err
      })

    await Driver.findOne({ userID: userID })
      .populate("vehicleID")
      .then((data) => {
        if (data) {
          profile.profile = data
        }
      })
      .catch((err) => {
        throw err
      })

    res.status(200).send(profile)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while fetching driver data!",
    })
  }
}
