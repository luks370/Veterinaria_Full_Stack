import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export const generarJWT = (usuario) => {
    const {id, email} = usuario

    const tokenJWT = jwt.sign(
        {
            id, 
            email
        }, 
        process.env.JWT_SECRET,
        {expiresIn: "1h"})
    
    return tokenJWT
}