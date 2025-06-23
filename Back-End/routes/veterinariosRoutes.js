import express from "express"
import {
  registrar,
  confirmar,
  autenticar,
  perfil,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/veterinariosControllers.js";
import checkAuth from "../middleware/authMiddlewre.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("veterinarios");
});

// PUBLICO
router.post("/registrar", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/resetear-password", olvidePassword);
router.get("/resetear-password/:token", comprobarToken);
router.post("/resetear-password/:token", nuevoPassword);
// PRIVADO
router.get("/perfil", checkAuth, perfil)

export default router