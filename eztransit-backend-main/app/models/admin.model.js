module.exports = (mongoose) => {
  var adminSchema = mongoose.Schema(
    {
      userName: {
        type: String,
        required: [true, "Username required!"],
      },
      password: {
        type: String,
        required: [true, "Password is required!"],
      },
    },
    { timestamps: true }
  )

  const Admin = mongoose.model("Admin", adminSchema)
  return Admin
}
