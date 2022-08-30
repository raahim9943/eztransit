module.exports = (mongoose) => {
  var driverSchema = mongoose.Schema(
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: [true, "Register an account first!"],
      },
      vehicleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        unique: true,
        required: [true, "Register your vehicle first!"],
      },
      verified: {
        type: Boolean,
        default: false,
      },
      location: {
        type: [Number],
        default: [0, 0],
      },
      available: {
        type: Boolean,
        default: false,
      },
      pendingTrip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        unique: true,
      },
    },
    { timestamps: true }
  )

  const Driver = mongoose.model("Driver", driverSchema)
  return Driver
}
