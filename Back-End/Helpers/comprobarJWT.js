import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const comprobarJWT = async (tokenJWT) => {
    return await jwt.verify(tokenJWT, process.env.JWT_SECRET)
}


export default comprobarJWT