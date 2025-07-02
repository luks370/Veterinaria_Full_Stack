import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const generarJWT = (info) => {
    return jwt.sign(info, process.env.JWT_SECRET, {expiresIn: "1h"})
}


export default generarJWT