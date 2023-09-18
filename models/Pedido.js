import mongoose from "mongoose";

const schemaPedido = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.ObjectId,
    ref: "Cliente",
  },
  pedido: [
    {
      producto: {
        type: mongoose.Schema.ObjectId,
        ref: "Producto",
      },
      cantidad: Number,
    },
  ],
  total: {
    type: Number,
  },
});

export default mongoose.model("Pedido", schemaPedido);
