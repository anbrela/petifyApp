//Siempre importamos mongoose, para utilizar los modelos, y el esquema.
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

//Te recomiendo que des más detalle sobre los atributos, como por su tipo, si son necesarios, con algún formato en concreto y demás. Te dejo un ejemplo con el title.
const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: String,
    photo: String,
    location: String,
    race: String,
    size: String,
    personality: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Pet", petSchema);
