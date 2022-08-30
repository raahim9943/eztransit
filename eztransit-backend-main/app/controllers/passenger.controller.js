const db = require("../models")
const Passenger = db.passengerModel
const User = db.userModel

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid Request!",
    })
  }

  const { location } = req.body

  try {
    let passenger = await Passenger.findOne({
      userID: req.user.id,
    })

    if (passenger) {
      return res.status(409).send({
        message: "Passenger already exists!",
      })
    }

    await User.findById(req.user.id).then((data) => {
      if (!data) {
        return res.status(400).send({
          message: "Provide correct token!",
        })
      }
    })

    passenger = new Passenger({
      userID: req.user.id,
      location,
    })

    await passenger
      .save()
      .then((data) => {
        res.status(200).send({
          message: "Profile registration complete!",
          profile: data._id,
          location: data.location,
        })
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while registring for passenger!",
    })
  }
}

exports.getLocation = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "Please provide an ID!" })
  }

  const passengerID = req.params.id

  try {
    await Passenger.findById(passengerID)
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
      message: "An error occurred while fetching passenger location!",
    })
  }
}

exports.updateLocation = async (req, res) => {
  if (!req.params.id || !req.body) {
    return res.status(400).send({ message: "Invalid request!" })
  }

  const passengerID = req.params.id
  const { location } = req.body

  try {
    const passenger = await Passenger.findById(passengerID)

    if (!passenger) {
      return res.status(404).send({ message: "Invalid ID!" })
    } else {
      if (passenger.userID != req.user.id) {
        return res.status(400).send({
          message: "Invalid token!",
        })
      } else {
        await Passenger.findByIdAndUpdate(
          passengerID,
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
      message: "An error occurred while updating passenger location!",
    })
  }
}

exports.getPendingTrip = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "Please provide an ID!" })
  }

  const passengerID = req.params.id

  try {
    await Passenger.findById(passengerID)
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
      message: "An error occurred while fetching passenger pending trip!",
    })
  }
}

exports.updatePendingTrip = async (req, res) => {
  if (!req.params.id || !req.body) {
    return res.status(400).send({ message: "Invalid request!" })
  }

  const passengerID = req.params.id
  const { pendingTrip } = req.body

  try {
    const passenger = await Passenger.findById(passengerID)

    if (!passenger) {
      return res.status(404).send({ message: "Invalid ID!" })
    } else {
      if (passenger.userID != req.user.id) {
        return res.status(400).send({
          message: "Invalid token!",
        })
      } else {
        await Passenger.findByIdAndUpdate(
          passengerID,
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
      message: "An error occurred while updating passenger pending trip!",
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

    await Passenger.findOne({ userID: userID })
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
      message: "An error occurred while fetching passenger data!",
    })
  }
}
