const db = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = db.users
const Driver = db.drivers
const Vehicle = db.vehicles

exports.signup = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid Request!",
    })
  }

  const { name, email, password, userType, location, profile } = req.body

  try {
    let user = await User.findOne({
      email: email,
    })

    if (user) {
      return res.status(400).send({
        message: "User already exists!",
      })
    }

    if (userType) {
      if (!profile)
        return res
          .status(400)
          .send({ message: "Error creating user with no driver data" })

      const driverProfile = await Driver.findById(profile)
      if (driverProfile) {
        user = new User({
          name,
          email,
          password,
          userType,
          location,
          profile,
        })
      } else {
        return res.status(400).send({
          message: "Error creating user with no driver data",
        })
      }
    } else {
      user = new User({
        name,
        email,
        password,
        userType,
        status: true,
        location,
      })
    }

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

        res.status(201).send({
          message: "Signed up successfully!",
          token: token,
          name: data.name,
          email: data.email,
          location: data.location,
          userType: data.userType,
          status: data.status,
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
        message: "User does not exists!",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(404).send({
        message: "Incorrect password!",
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
      name: user.name,
      email: user.email,
      location: user.location,
      userType: user.userType,
      status: user.status,
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while logging in!",
    })
  }
}

exports.getinfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).send({
        message: "Invalid token!",
      })
    }

    res.status(200).send({
      name: user.name,
      email: user.email,
      location: user.location,
      userType: user.userType,
      status: user.status,
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while fetching details!",
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
    if (req.body.update.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.update.password = await bcrypt.hash(
        req.body.update.password,
        salt
      )
    }

    if (req.body.update.profile) {
      return res.status(400).send({
        message: "Bad request!",
      })
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
      const driver = await Driver.findById(user.profile)

      await Vehicle.findByIdAndRemove(driver.vehicle, {
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

    await User.findByIdAndRemove(user._id, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Invalid token!`,
          })
        } else {
          res.status(200).send({
            message: "User deleted successfully!",
          })
        }
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