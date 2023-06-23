const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  nombre: {
    type: String,
  },
  apellido: {
    type: String,
  },
  profile_picture: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  contraseña: {
    type: String,
  },
  genero: {
    type: String,
    enum: ["Masculino", "Femenino", "Otro"],
  },
  fechaNacimiento: {
    type: Date,
  },
  ubicacion: [
    {
      ciudad: {
        type: String,
      },
      direccion: {
        type: String,
      },
      codigoPostal: {
        type: Number,
      },
    },
  ],
  metodosPago: [
    {
      tipo: {
        type: String,
      },
      numero: {
        type: String,
      },
    },
  ],
});

module.exports = model("User", userSchema);
