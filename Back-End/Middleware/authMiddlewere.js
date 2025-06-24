import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const auth = async (req, res, next) => {
    const tokenJWT = req.headers.authorization?.split(" ")[1]

    if(!tokenJWT){
        return res.status(404).json({msj: "Acceso negada"})
    }

    try {
        const decoded = await jwt.verify(tokenJWT, process.env.JWT_SECRET);

        req.veterinario = decoded
    } catch (error) {
        console.log(error)
    }

    next();
}

export default auth