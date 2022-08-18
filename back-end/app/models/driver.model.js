module.exports = (mongoose) => {
    var driverSchema = mongoose.Schema(
      {
        vehicle: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vehicle",
          unique: true,
        },
        available: {
          type: Boolean,
          default: true,
          required: true,
        },
      },
      { timestamps: true }
    )
  
    const Driver = mongoose.model("Driver", driverSchema)
    return Driver
  }