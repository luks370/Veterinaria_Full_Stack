import express from "express"
import {
    registrar,
    confirmar,
    autenticar
} from "../Controllers/veterinarios.js"

const router = express.Router();

router.use("/registrar", registrar)


export default router