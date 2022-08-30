const db = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = db.userModel
const Passenger = db.passengerModel
const Driver = db.driverModel
const Vehicle = db.vehicleModel

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid Request!",
    })
  }

  const { name, email, password, userType } = req.body

  try {
    let user = await User.findOne({
      email: email,
    })

    if (user) {
      return res.status(409).send({
        message: "User already exists!",
      })
    }

    user = new User({
      name,
      email,
      password,
      userType,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user
      .save()
      .then((data) => {
        const payload = {
          user: {
            id: data._id,
          },
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "7d",
        })

        res.status(200).send({
          message: "Signed up successfully!",
          token: token,
          id: data._id,
          name: data.name,
          email: data.email,
          userType: data.userType,
        })
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while creating a new user!",
    })
  }
}

exports.login = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid Request!",
    })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({
      email: email,
    })

    if (!user) {
      return res.status(404).send({
        message: "Email not registered!",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(403).send({
        message: "Incorrect password!",
      })
    }

    let profile = {}

    if (user.userType) {
      await Driver.findOne({ userID: user._id }).then((data) => {
        if (data) {
          profile = data
        }
      })
    } else {
      await Passenger.findOne({ userID: user._id }).then((data) => {
        if (data) {
          profile = data
        }
      })
    }

    const payload = {
      user: {
        id: user._id,
      },
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.status(200).send({
      message: "Logged in successfully!",
      token: token,
      id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      profile: profile,
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while logging in!",
    })
  }
}

exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid Request!",
    })
  }

  try {
    if (req.body.update.email || req.body.update.userType) {
      return res.status(403).send({
        message: "Can not update email or user type!",
      })
    }

    if (req.body.update.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.update.password = await bcrypt.hash(
        req.body.update.password,
        salt
      )
    }

    await User.findByIdAndUpdate(req.user.id, req.body.update, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Invalid token!",
          })
        } else
          return res.status(200).send({ message: "User successfully updated!" })
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while updating user!",
    })
  }
}

exports.delete = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user)
      return res.status(404).send({
        message: "Invalid token!",
      })

    if (user.userType) {
      const driver = await Driver.findOne({ userID: user._id })

      if (driver) {
        await Vehicle.findByIdAndRemove(driver.vehicleID, {
          useFindAndModify: false,
        }).catch((err) => {
          throw err
        })
        await Driver.findByIdAndRemove(driver._id, {
          useFindAndModify: false,
        }).catch((err) => {
          throw err
        })
      }
    } else {
      const passenger = await Passenger.findOne({ userID: user._id })

      if (passenger) {
        await Passenger.findByIdAndRemove(passenger._id, {
          useFindAndModify: false,
        }).catch((err) => {
          throw err
        })
      }
    }

    await User.findByIdAndRemove(user._id, { useFindAndModify: false })
      .then((data) => {
        res.status(200).send({
          message: "User deleted successfully!",
        })
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while deleting user!",
    })
  }
}
