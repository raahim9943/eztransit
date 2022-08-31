require("dotenv").config({ path: "./config.env" })

const express = require("express")
const cors = require("cors")

const PORT = process.env.PORT || 1337
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const db = require("./app/models")
db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database!")
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err)
    process.exit()
  })

app.get("/", (req, res) => {
  res.json({ message: "All systems functional." })
})

require("./app/routes/user.routes")(app)
require("./app/routes/driver.routes")(app)
require("./app/routes/vehicle.routes")(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
