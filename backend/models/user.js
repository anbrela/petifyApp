const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: String,
    phone: String,

    //Contact person
    person: String,

    //Por defecto el rol que se le asigna a alguien al registrarse es usuario, los roles se cambiarán luego con funciones de admin.
    role: {
      type: String,
      default: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, recievedPassword) => {
  console.log(password);
  console.log(recievedPassword);
  return await bcrypt.compare(password, recievedPassword);
};

module.exports = mongoose.model("User", userSchema);
