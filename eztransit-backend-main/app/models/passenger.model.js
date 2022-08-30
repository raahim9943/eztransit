module.exports = (mongoose) => {
  var passengerSchema = mongoose.Schema(
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: [true, "Register an account first!"],
      },
      location: {
        type: [Number],
        default: [0, 0],
      },
      pendingTrip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        unique: true,
      },
    },
    { timestamps: true }
  )

  const Passenger = mongoose.model("Passenger", passengerSchema)
  return Passenger
}
