//Importamos el modelo del usuario para iniciar sesión y registrar usuario.
const User = require("../models/user");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
/* const mailing = require("./mail");
 */
const signup = async (req, res) => {
  const {
    username,
    email,
    likedPets,
    dislikedPets,
    password,
    address,
    phone,
    contact,
  } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
    address,
    phone,
    contact,
    likedPets,
    dislikedPets,
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
        likedPets: savedUser.likedPets,
        dislikedPets: savedUser.dislikedPets,
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
    likedPets: userFound.likedPets,
    dislikedPets: userFound.dislikedPets,
  });
};

const loginByToken = async (req, res) => {
  const token = req.headers["x-access-token"];
  let decoded = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decoded.id);
  if (user)
    return res.status(200).json({
      token: token,
      userID: user._id,
      username: user.username,
      expires: 86400,
      verified: null,
      likedPets: user.likedPets,
      dislikedPets: user.dislikedPets,
    });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);
  return res.status(200).json(user);
};

const userUpdatedById = async (req, res) => {
  const userUpdated = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(userUpdated);
};

module.exports = {
  signup,
  signin,
  loginByToken,
  getUserById,
  userUpdatedById,
};
