import express from "express"
import dotenv from "dotenv"
import veterinariosRouter from "./Routers/veterinariosRouter.js";
import pacientesRouter from "./Routers/pacientesRouter.js";
import "./Models/Veterinarios.js";
import "./Models/Pacientes.js";
import "./Models/relaciones.js";
import db from "./config/db.js";

const PORT = process.env.SERVER_PORT || 3000;
dotenv.config();

const app = express();
app.use(express.json());
await db.sync({ alter: true });

app.use("/api/veterinarios", veterinariosRouter);
app.use("/api/pacientes", pacientesRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));