import { Router } from "express";
import {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/clienteController.js";

import {
  nuevoProducto,
  subirArchivo,
  mostrarProductos,
  mostrarProducto,
  actualizarProducto,
  eliminarProducto,
  buscarProducto,
} from "../controllers/productoController.js";

import {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  actualizarPedido,
  eliminarPedido,
} from "../controllers/pedidoController.js";

import {
  registrarUsuario,
  autenticarUsuario,
} from "../controllers/usuarioController.js";

//middleware para proteger rutas
import { auth } from "../middleware/auth.js";

const router = Router();

//Agrega nuevos clientes
router.post("/clientes", auth, nuevoCliente);

//Mostrar todos los cleintes
router.get("/clientes", auth, mostrarClientes);

//MOstar un cliente
router.get("/clientes/:idCliente", auth, mostrarCliente);

//Actualizar un cliente
router.put("/clientes/:idCliente", auth, actualizarCliente);

//Eliminar cliente
router.delete("/clientes/:idCliente", auth, eliminarCliente);

//PRODUCTOS
router.post("/productos", subirArchivo, auth, nuevoProducto);

//Busqueda de productos
router.post("/productos/busqueda/:query", auth, buscarProducto);

router.get("/productos", auth, mostrarProductos);

router.get("/productos/:idProducto", auth, mostrarProducto);

router.put("/productos/:idProducto", auth, subirArchivo, actualizarProducto);

router.delete("/productos/:idProducto", auth, eliminarProducto);

//PEDIDOS
// Agregar nuevos pedidos
router.post("/pedidos/nuevo/:idUsuario", auth, nuevoPedido);

// Mostrar todos los pedidos
router.get("/pedidos", auth, mostrarPedidos);

// Mostrar un pedido por su id
router.get("/pedidos/:idPedido", auth, mostrarPedido);

// Actualizar pedido
router.put("/pedidos/:idPedido", auth, actualizarPedido);

// Eliminar producto
router.delete("/pedidos/:idPedido", auth, eliminarPedido);

//Uusarios
router.post("/crear-cuenta", auth, registrarUsuario);

router.post("/iniciar-sesion", autenticarUsuario);

export default router;
