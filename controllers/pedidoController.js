import Pedido from "../models/Pedido.js";

const nuevoPedido = async (req, res, next) => {
  const pedido = new Pedido(req.body);
  try {
    await pedido.save();
    res.json({ mensaje: "Se agrego un nuevo pedido" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Producto",
    });
    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

const mostrarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedido.findById(req.params.idPedido);
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

const actualizarPedido = async (req, res, next) => {
  try {
    const pedido = await Pedido.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      {
        new: true,
      }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Producto",
      });
    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

const eliminarPedido = async (req, res, next) => {
  try {
    await Pedido.findByIdAndDelete({ _id: req.params.idPedido });
    res.json({ mensaje: "El pedido de ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

export {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  actualizarPedido,
  eliminarPedido,
};
