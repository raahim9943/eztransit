const db = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Admin = db.admins

exports.start = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid Request!",
    })
  }

  const { name, password } = req.body

  try {
    await Admin.find({}).then((data) => {
      if (data) {
        return res.status(400).send({
          message: "Invalid Request!",
        })
      }
    })

    let admin = new Admin({
      name,
      password,
    })

    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(password, salt)

    await admin
      .save()
      .then((data) => {
        res.status(200).send({ data })
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while creating admin!",
    })
  }
}

exports.login = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Invalid Request!",
    })
  }

  const { name, password } = req.body

  try {
    let admin = await Admin.findOne({
      name: name,
    })

    if (!admin) {
      return res.status(404).send({
        message: "Invalid Username!",
      })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(404).send({
        message: "Incorrect password!",
      })
    }

    const payload = {
      user: {
        id: admin._id,
      },
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })

    res.status(200).send({
      message: "Logged in successfully!",
      token: token,
      name: admin.name,
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
    if (req.body.update.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.update.password = await bcrypt.hash(
        req.body.update.password,
        salt
      )
    }

    await Admin.findByIdAndUpdate(req.user.id, req.body.update, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: "Invalid token!",
          })
        } else
          return res
            .status(200)
            .send({ message: "Admin successfully updated!" })
      })
      .catch((err) => {
        throw err
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: "An error occurred while updating admin!",
    })
  }
}
