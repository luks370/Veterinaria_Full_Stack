import express from "express"
import {
    registrar,
    confirmar,
    autenticar,
    perfil
} from "../controllers/veterinariosControllers.js"
import checkAuth from "../middleware/authMiddlewre.js"


const router = express.Router();

router.get("/", (req, res) => {
    res.send("veterinarios")
})

// PUBLICO
router.post("/registrar", registrar)
router.get("/confirmar/:token", confirmar)
router.post("/login", autenticar)

// PRIVADO
router.get("/perfil", checkAuth, perfil)

export default router