import express from "express"
const server = express();
import dotenv from "dotenv"
import veterinariosRoutes from "./routes/veterinariosRoutes.js";

dotenv.config();
server.use(express.json())

const PORT = process.env.EXPRESS_PORT || 3000;

server.use("/api/veterinarios", veterinariosRoutes)


server.listen(PORT, () => console.log(`http://localhost:${PORT}`))