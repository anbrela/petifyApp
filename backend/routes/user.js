//Imports necesarios para crear rutas de la API
const express = require("express");
const router = express.Router();

//De momento no necesitamos el validador de token, pero en un futuro sí.
const authJwt = require("../middlewares/auth");

//Controlador con funciones del usuario.
const userController = require("../controllers/user");

//Ruta para registrar un usuario.
router.post("/signup", userController.signup);

//Ruta para hacer login.
router.post("/signin", userController.signin);

router.get("/loginByToken", authJwt.verifyToken, userController.loginByToken);

//updateUser
router.put("/:userId", authJwt.verifyToken, userController.userUpdatedById);

//get user
router.get("/:userId", userController.getUserById);

module.exports = router;
