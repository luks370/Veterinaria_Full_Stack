import express from "express"
import auth from "../Middleware/authMiddlewere.js";
import {
  obtenerVeterinarios,
  registrar,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  obtenerPerfil,
} from "../Controllers/veterinarios.js";

const router = express.Router();

router.get("/obtener-veterinarios", obtenerVeterinarios);

// AREA PUBLICA
router.post("/registrar", registrar);

router.get("/confirmar/:token", confirmar);

router.post("/login", autenticar);

router.post("/olvide-password", olvidePassword)
router.get("/olvide-password/:token", comprobarToken)
router.post("/olvide-password/:token", nuevoPassword)

// AREA PRIVADA
router.get("/perfil", auth, obtenerPerfil);
export default router