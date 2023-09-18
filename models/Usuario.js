import mongoose from "mongoose";

const schemaUsuario = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  nombre: {
    type: String,
    required: "Agrega tu nombre",
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Usuario", schemaUsuario);
