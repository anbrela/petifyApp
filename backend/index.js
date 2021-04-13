//Imports de mongoose, .env y app.
const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const port = 4000;


//Conectar a la DB
mongoose
  .connect("mongodb+srv://huppy:huppy@cluster0.cjgqz.mongodb.net/Huppy?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => {
    app.listen(port, () => {
      console.log("Api iniciada en " + port);
    });
  })
  .catch((error) => console.log("no conectado" + error));