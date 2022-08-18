module.exports = (mongoose) => {
    var tripSchema = mongoose.Schema(
      {
        driver: {
          type: Schema.Types.ObjectId,
          ref: "Driver",
        },
        passenger: {
          type: Schema.Types.ObjectId,
          ref: "Passenger",
        },
        destination: {
          type: { type: String, default: "Point" },
          coordinates: { type: [Number], default: [0, 0] },
        },
        pickup: {
          type: { type: String, default: "Point" },
          coordinates: { type: [Number], default: [0, 0] },
        },
        date: {
          type: Date,
          immutable: true,
          default: () => Date.now(),
        },
        status: {
          type: Boolean,
          default: true,
          required: true,
        },
        fare: {
          type: Number,
          required: true,
        },
      },
      { timestamps: true }
    );
  
    tripSchema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Trip = mongoose.model("Trip", tripSchema);
    return Trip;
  };