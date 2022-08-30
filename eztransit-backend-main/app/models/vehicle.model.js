module.exports = (mongoose) => {
  var vehicleSchema = mongoose.Schema(
    {
      manufacturer: {
        type: String,
        required: [true, "Manufacturer is required!"],
      },
      model: {
        type: String,
        required: [true, "Model is required!"],
      },
      registrationNumber: {
        type: String,
        unique: true,
        required: [true, "Registration number is required!"],
      },
      color: {
        type: String,
        required: [true, "Color is required!"],
      },
    },
    { timestamps: true }
  )

  const Vehicle = mongoose.model("Vehicle", vehicleSchema)
  return Vehicle
}
