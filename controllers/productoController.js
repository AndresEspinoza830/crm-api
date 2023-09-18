import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import shortid from "shortid";
import Producto from "../models/Producto.js";

// Obtener la ubicación del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configuracionMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no valido"));
    }
  },
};

//pasar los configuracion y el campo
const upload = multer(configuracionMulter).single("imagen");

const subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      return res
        .status(400)
        .json({ mensaje: "Error al subir el archivo", error: error.message });
    }
    next();
  });
};

const nuevoProducto = async (req, res, next) => {
  const producto = new Producto(req.body);
  try {
    if (req.file.filename) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    res.json({ mensaje: "Se agrego un nuevo producto" });
  } catch (error) {
    console.log(error);
    next();
  }
};

const mostrarProductos = async (req, res, next) => {
  try {
    //obtener todos los prodcutos
    const productos = await Producto.find({});
    res.json(productos);
  } catch (error) {
    console.log(error);
    next();
  }
};

const mostrarProducto = async (req, res, next) => {
  const producto = await Producto.findById(req.params.idProducto);

  if (!producto) {
    res.json({ mensaje: "Ese producto no existe" });
    return next();
  }

  //Mostrar el rpdocuto
  res.json(producto);
};

const actualizarProducto = async (req, res, next) => {
  try {
    let productoAnterior = await Producto.findById(req.params.idProducto);

    //construir un neuvo producto
    let nuevoProducto = req.body;

    //verificar si hay imagen nueva
    if (req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      nuevoProducto.imagen = productoAnterior.imagen;
    }

    let producto = await Producto.findByIdAndUpdate(
      { _id: req.params.idProducto },
      nuevoProducto,
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const eliminarProducto = async (req, res, next) => {
  try {
    await Producto.findByIdAndDelete({
      _id: req.params.idProducto,
    });
    req.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

const buscarProducto = async (req, res, next) => {
  try {
    const { query } = req.params;
    const producto = await Producto.find({ nombre: new RegExp(query, "i") });
    res.json(producto);
  } catch (error) {
    console.log(error);
    next();
  }
};

export {
  nuevoProducto,
  subirArchivo,
  mostrarProductos,
  mostrarProducto,
  actualizarProducto,
  eliminarProducto,
  buscarProducto,
};
