import express from "express"
import auth from "../Middleware/authMiddlewere.js";
import {
  obtenerVeterinarios,
  registrar,
  confirmar,
  autenticar,
  obtenerPerfil,
} from "../Controllers/veterinarios.js";

const router = express.Router();

router.get("/obtener-veterinarios", obtenerVeterinarios);

//PUBLICO
router.post("/registrar", registrar);

router.get("/confirmar/:token", confirmar);

router.post("/login", autenticar);

//PRIVADO
router.get("/perfil", auth, obtenerPerfil);
export default router