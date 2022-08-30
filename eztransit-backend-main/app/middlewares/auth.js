const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.status(401).send({ message: "Unauthorized request!" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (e) {
    console.error(e)
    res.status(403).send({
      message: "Invalid token!",
    })
  }
}
