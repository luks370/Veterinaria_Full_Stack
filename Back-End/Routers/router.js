import express from "express"
import {
  obtenerVeterinarios,
  registrar,
  confirmar,
  autenticar,
} from "../Controllers/veterinarios.js";

const router = express.Router();

router.get("/obtener-veterinarios", obtenerVeterinarios);

router.post("/registrar", registrar);

router.get("/confirmar/:token", confirmar);

router.post("/login", autenticar);

export default router