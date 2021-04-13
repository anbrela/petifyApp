//Cargar rutas de la API
const dotenv = require("dotenv").config();
const petRoutes = require("./routes/pet");
const userRoutes = require("./routes/user");


//cargar modulos de node
const express = require("express");
const router = express.Router();

//ejecutar express (http) es el servidor.
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");



//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// CORS
app.use(cors());


//añadir prefijos a rutas o cargar rutas
/* app.use("/api/pet", petRoutes);
app.use("/api/users", userRoutes); */

// Exportar módulo (fichero actual)
module.exports = app;