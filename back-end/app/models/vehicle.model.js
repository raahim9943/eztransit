module.exports = (mongoose) => {
    var vehicleSchema = mongoose.Schema(
      {
        manufacturer: {
          type: String,
          required: true,
          maxLength: 15,
        },
        model: {
          type: String,
          required: true,
          maxLength: 10,
        },
        regNum: {
          type: String,
          required: true,
          unique: true,
        },
        color: {
          type: String,
          required: true,
          maxLength: 8,
        },
      },
      { timestamps: true }
    )
  
    const Vehicle = mongoose.model("Vehicle", vehicleSchema)
    return Vehicle
  }