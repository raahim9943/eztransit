module.exports = (mongoose) => {
  var userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Name is required!"],
      },
      email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "Email is required!"],
        validate: {
          validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
          },
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
      password: {
        type: String,
        required: [true, "Password is required!"],
      },
      userType: {
        type: Boolean,
        required: [true, "Pick a user type!"],
      },
    },
    { timestamps: true }
  )

  const User = mongoose.model("User", userSchema)
  return User
}
