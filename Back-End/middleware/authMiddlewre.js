import jwt from "jsonwebtoken";
import dotenv, { parse } from "dotenv";
import veterinariosTabla from "../models/Veterinarios.js";

dotenv.config();

const checkAuth = async (req, res, next) => {
  let token;

  // si no existe el token
  if (!req.headers.authorization) {
    return res.status(403).json({ msj: "No existe token jwt" });
  }

  // verificar token
  try {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.veterinario = decoded;

    // req.veterinario = await veterinariosTabla.findByPk(decoded.id, {
    //   attributes: { exclude: ["password", "token", "confirmado"] },
    // });

    next();
  } catch (error) {
    console.log(error);
  }
};

export default checkAuth;
