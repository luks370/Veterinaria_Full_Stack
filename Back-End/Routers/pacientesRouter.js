import express from "express"
import auth from "../Middleware/authMiddlewere.js";
import {
  obtenerPacientes,
  obtenerPaciente,
  agregarPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../Controllers/pacientes.js";

const router = express.Router();

router.get("/", auth, obtenerPacientes);
router.get("/:pacienteId", auth, obtenerPaciente);
router.post("/agregar", auth, agregarPaciente);
router.put("/actualizar/:id", auth, actualizarPaciente);
router.delete("/eliminar/:id", auth, eliminarPaciente);

export default router