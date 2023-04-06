import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import Usuario from "../models/Usuario.js";
import Roles from "../models/Roles.js";

export const verificarToken = async (req, res, next) => {
  try {
    const token = req.headers["acceso-token"];
    if (!token) {
      return res.status(400).json("!Sin Token!");
    }
    const decodificacion = jwt.verify(token, JWT_SECRET);
    req.userId = decodificacion.id;
    const user = await Usuario.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(400).json("!Usuario no existente!");
    }

    next();
  } catch (error) {
    return res.status(400).json("!No autorizado!");
  }
};

export const esModerador = async (req, res, next) => {
  const usuarioAdmin = await Usuario.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: usuarioAdmin.rol } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].nombre === "moderador") {
      next();
      return;
    }
  }

  return res.status(400).json("!No Eres un Moderador!");
};

export const esAdministrador = async (req, res, next) => {
  const usuarioAdmin = await Usuario.findById(req.userId);
  const roles = await Roles.find({ _id: { $in: usuarioAdmin.rol } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].nombre === "administrador") {
      next();
      return;
    }
  }

  return res.status(400).json("!No Eres un Administrador!");
};
