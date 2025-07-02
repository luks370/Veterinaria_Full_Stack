import express from "express"
const router = express.Router()
import authCheck from "../Middleware/auth.js";

import {
    obtenerVeterinarios,
    registrar,
    confirmarToken,
    login,
    perfil,
    olvidePassword,
    comprobarToken,
    nuevaPassword
} from "../Controllers/veterinariosController.js"

router.get("/obtener-veterinarios", obtenerVeterinarios);
// publico
router.post("/registrar", registrar)
router.get("/confirmar/:token", confirmarToken)
router.post("/login", login)

router.post("/olvide-password", olvidePassword)
router.get("/olvide-password/:token", comprobarToken)
router.post("/olvide-password/:token", nuevaPassword)
// privado
router.get("/perfil", authCheck, perfil)

export default router