import Cliente from "../models/Cliente.js";

const nuevoCliente = async (req, res, next) => {
  try {
    await Cliente.create(req.body);
    res.json({ mensaje: "Se agrego nuevo cliente" });
  } catch (error) {
    res.send(error);
    next();
  }
};

const mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Cliente.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

const mostrarCliente = async (req, res, next) => {
  const { idCliente } = req.params;
  try {
    const cliente = await Cliente.findById(idCliente);
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};

const actualizarCliente = async (req, res, next) => {
  const { idCliente } = req.params;
  try {
    const cliente = await Cliente.findOneAndUpdate(
      { _id: idCliente },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
  } catch (error) {
    res.send(error);
    next();
  }
};

const eliminarCliente = async (req, res, next) => {
  const { idCliente } = req.params;
  try {
    await Cliente.findOneAndDelete({ _id: idCliente });
    res.json({ mensaje: "El cliente se ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

export {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente,
};
