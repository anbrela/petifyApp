//Imports necesarios para crear rutas de la API
const express = require("express");
const router = express.Router();

//Import necesario para verificar el token, viene de middleware.
const authJwt = require("../middlewares/auth");

//Llamada a las rutas de mascotas
const petController = require("../controllers/pet");

//Connect multiparty para dependencias de imagenes.
const multipart = require("connect-multiparty");
const md_upload = multipart({ uploadDir: "./images/originals" });

//Ruta para añadir una mascota
router.post("/", petController.newPet);

//Ruta para devolver una mascota
router.get("/", petController.getPets);

// Ruta para devolver todas las mascotas
router.get("/:petId", petController.getPet);

router.post("/upload-image/:petId", md_upload, petController.uploadPetPhoto);

router.get("/get-image/:image", petController.getPetImage);

module.exports = router;
