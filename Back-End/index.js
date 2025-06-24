import express from "express"
import dotenv from "dotenv"
import veterinariosRouter from "./Routers/router.js"

const PORT = process.env.SERVER_PORT || 3000
dotenv.config()

const app = express();
app.use(express.json())

app.use("/api/veterinarios", veterinariosRouter);

app.listen(PORT, () => console.log(`http://localhost:${PORT}/api`))