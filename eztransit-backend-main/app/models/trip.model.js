module.exports = (mongoose) => {
  var tripSchema = mongoose.Schema(
    {
      passengerID: {
        type: Schema.Types.ObjectId,
        ref: "Passenger",
        required: [true, "Passenger ID required!"],
      },
      driverID: {
        type: Schema.Types.ObjectId,
        ref: "Driver",
      },
      destination: {
        type: [Number],
        required: [true, "Destination is required!"],
      },
      pickup: {
        type: [Number],
        required: [true, "Pickup location is required!"],
      },
      fare: {
        type: Number,
        required: [true, "Fare required!"],
      },
      status: {
        type: String,
        enum: ["init", "pickup", "enroute", "complete", "cancelled"],
        default: "init",
      },
    },
    { timestamps: true }
  )

  const Trip = mongoose.model("Trip", tripSchema)
  return Trip
}
