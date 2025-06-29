import express from "express"
import auth from "../Middleware/authMiddlewere.js";
import {
    obtenerPacientes,
    obtenerPaciente,
    agregar
} from "../Controllers/pacientes.js"


const router = express.Router();


router.get("/", auth, obtenerPacientes)
router.get("/:pacienteId", auth, obtenerPaciente)
router.post("/agregar", auth, agregar)


export default router