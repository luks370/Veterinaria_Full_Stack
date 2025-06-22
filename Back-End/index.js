import express from "express"
import dotenv from "dotenv"
import veterinariosRoutes from "./routes/veterinariosRoutes.js";

// habilitamos variables de entorno
dotenv.config()

// definimos puerto
const PORT = process.env.PORT || 3306

//inicilizamos express
const app = express();
// habilitamos json para leer datos

app.use(express.json())

// point para veterinarios
app.use("/api/veterinarios", veterinariosRoutes)

// activamos seridor
app.listen(PORT, () =>
  console.log(`http://localhost:${PORT}/api/veterinarios`)
);
