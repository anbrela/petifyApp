//Importamos el modelo de espectaculo para poder crear, modificar y borrarlos.
const Pet = require("../models/pet");
const jwt = require("jsonwebtoken");

//Movidas para los archivos.
var fs = require("fs");
var path = require("path");
const sharp = require("sharp");

const newPet = async (req, res) => {
  const { name, image, age, location, bio, size, personality, user } = req.body;

  console.log(req.body);

  const createPet = new Pet({
    name,
    image,
    age,
    bio,
    location,
    size,
    personality,
    user,
  });

  try {
    const petSaved = await createPet.save();
    res.status(200).json(petSaved);
  } catch (err) {
    console.log(err);
  }
};

const getPets = async (req, res) => {
  const pets = await Pet.find();
  res.json(pets);
};

const getPet = async (req, res) => {
  const pet = await Pet.findById(req.params.petId);
  res.status(200).json(pet);
};

//SUBIR IMAGEN PERRO

const uploadPetPhoto = async (req, res) => {
  const petId = await Pet.findById(req.params.petId);

  var fileName = "Imagen no subida..";

  if (!req.files) {
    return res.status(404).send({
      status: "error",
      message: fileName,
    });
  }

  var file_path = req.files.file0.path;

  parsePath = path.parse(file_path);

  fileComplete = parsePath.base;
  console.log(fileComplete);

  file_name = parsePath.name;

  file_ext = parsePath.ext;

  ext_file = file_ext.split(".");

  file_extension = ext_file[1];

  if (
    file_extension != "jpg" &&
    file_extension != "png" &&
    file_extension != "jpeg"
  ) {
    fs.unlink(file_path, (err) => {
      return res.status(500).send({
        status: "error",
        message: "No es un archivo de imagen compatible",
      });
    });
  } else {
    sharp(file_path)
      .resize({ width: 600 })
      .toFile("./images/optimized/" + fileComplete)
      .then(function (newFileInfo) {
        console.log(newFileInfo);
        Pet.findOneAndUpdate(
          { _id: petId },
          { image: fileComplete },
          { new: true },
          (err, petUpdated) => {
            if (err || !petUpdated) {
              return res.status(500).send({
                status: "error",
                message: "fallo al subir la imagen",
              });
            }

            return res.status(200).send({
              status: "success",
              message: "imagen actualizada",
              petUpdated,
            });
          }
        );
      })
      .catch(function (err) {
        console.log("Got Error");
      });
  }
};

const getPetImage = async (req, res) => {
  const file = await req.params.image;
  var path_file = "./images/optimized/" + file;
  fs.access(path_file, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(500).send({
        status: "error",
        message: "la imagen no existe",
      });
    } else {
      return res.sendFile(path.resolve(path_file));
    }
  });
};

module.exports = {
  newPet,
  getPet,
  getPets,
  uploadPetPhoto,
  getPetImage,
};
