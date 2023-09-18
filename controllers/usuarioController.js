import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registrarUsuario = async (req, res) => {
  //leer los datos del usuario
  const usuario = new Usuario(req.body);

  //Hashear password
  const salt = bcrypt.genSaltSync(12);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  usuario.password = passwordHash;

  try {
    await usuario.save();
    res.json({ mensaje: "Usuario creado Correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};

const autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    return res.status(401).json({ mensaje: "Ese usuario no existe" });
  } else {
    //El usuario, existe, verificar el password
    bcrypt.compare(password, usuario.password, function (err, result) {
      if (err) {
        return res.status(401).json({ mensaje: "Error al comparar passwords" });
      } else if (result) {
        const token = jwt.sign(
          {
            id: usuario._id,
            email: usuario.email,
            nombre: usuario.nombre,
          },
          "LLAVESECRETA",
          {
            expiresIn: "1h",
          }
        );

        //retornar token
        res.json({ token });
      } else {
        res.status(401).json({ mensaje: "Contraseña incorrecta" });
      }
    });
  }
};

export { registrarUsuario, autenticarUsuario };
