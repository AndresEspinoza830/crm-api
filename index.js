import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conexionDB from "./config/db.js";
import indexRoutes from "./routes/index.js";

//Variables de entorno
dotenv.config();

//Variable que contiene toda la informacion de express
const app = express();

//Variables de entorno
dotenv.config();

//Leyendo datos de un formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Habilitar Cors
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    //revisar si la peticion viene de un servidor que esta en whiteList
    const existe = whiteList.some((dominio) => dominio === origin);
    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No permitido CORS"));
    }
  },
};

app.use(cors(corsOptions));

//Conexion a la base de datos
await conexionDB();

//Archivos pbulcios
app.use(express.static("uploads"));

//Routing
app.use("/", indexRoutes);

//Escuchando un puerto
const PORT = process.env.PORT ?? 5004;
app.listen(PORT, () => {
  console.log(`Escuchando servidor desde el puerto ${PORT}`);
});
