import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
  },
  imagen: {
    type: String,
  },
});

export default mongoose.model("Producto", productoSchema);
