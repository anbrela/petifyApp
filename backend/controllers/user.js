//Importamos el modelo del usuario para iniciar sesión y registrar usuario.
const User = require("../models/user");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
/* const mailing = require("./mail");
 */
const signup = async (req, res) => {
  const { username, email, password, address, phone, contact } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
    address,
    phone,
    contact,
  });

  var query = { email: req.body.email };

  User.findOneAndUpdate(query, { upsert: true }, function (err, doc) {
    if (err) {
      console.log(err);
      return res.status(404, { error: err });
    }

    if (doc) {
      return res.status(404).json({ message: "El usuario ya existe" });
    } else {
      const savedUser = newUser.save();

      const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
        expiresIn: 86400,
      });

      res.status(200).json({
        token: token,
        userID: savedUser._id,
        username: savedUser.username,
        expires: 86400,
      });
    }
  });

  /*   const verificationToken = jwt.sign(
    { id: savedUser._id },
    process.env.SECRET,
    {
      expiresIn: 86400,
    }
  ); */
  /*   mailing.verificationEmail(
    savedUser.username,
    savedUser.email,
    process.env.VERIFY_EMAIL + verificationToken
  );
 */
};

const signin = async (req, res) => {
  const userFound = await User.findOne({
    email: req.body.email,
  }).populate("roles");

  if (!userFound) return res.status(400).json({ message: "user not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res
      .status(401)
      .json({ token: null, message: "la contraseña no coincide" });

  const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
    expiresIn: 86400,
  });

  res.cookie("x_access_token", token, {
    maxAge: 8400,
    httpOnly: true,
  });

  res.json({
    token: token,
    userID: userFound._id,
    username: userFound.username,
    expires: 86400,
  });
};

module.exports = {
  signup,
  signin,
};
