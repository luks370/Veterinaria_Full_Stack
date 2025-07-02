import express from "express"
import {
    obtenerPacientes,
    agregar,
    obtenerPacienteId,
    actualizar,
    eliminar
} from "../Controllers/pacientesController.js"
import authCheck from "../Middleware/auth.js";

const router = express.Router();

router.get("/", authCheck, obtenerPacientes)
router.get("/:id", authCheck, obtenerPacienteId)
router.post("/agregar", authCheck, agregar)
router.put("/actualizar/:id", authCheck, actualizar)
router.delete("/eliminar/:id", authCheck, eliminar)



export default router