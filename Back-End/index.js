import express from "express"
const server = express();
import dotenv from "dotenv"
import cors from "cors";
import veterinariosRoutes from "./routes/veterinariosRoutes.js";
import pacientesRoutes from "./routes/pacientesRoutes.js";

dotenv.config();

// habilitar cors
let origenesPermitidos = ["http://localhost:5173"];
const opciones = {
  origin: function (origin, cb) {
    if (origenesPermitidos.findIndex(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error("No permitido por cors"));
    }
  },
};

server.use(cors(origenesPermitidos));


server.use(express.json());

const PORT = process.env.EXPRESS_PORT || 3000;

server.use("/api/veterinarios", veterinariosRoutes);
server.use("/api/pacientes", pacientesRoutes);


server.listen(PORT, () => console.log(`http://localhost:${PORT}`))